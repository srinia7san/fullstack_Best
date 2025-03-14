package com.contractanalysis.service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.contractanalysis.model.Contract;
import com.contractanalysis.model.Risk;
import com.contractanalysis.model.Compliance;
import com.contractanalysis.model.Opportunity;
import com.contractanalysis.model.KeyClause;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;
    
    private final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=";
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final Gson gson = new Gson();

    public Contract analyzeContract(String text) {
        String prompt = createAnalysisPrompt(text);
        String response = callGeminiApi(prompt);
        return parseGeminiResponse(response, text);
    }

    public Map<String, Object> analyzeContractText(String contractText) {
        try {
            Contract contract = analyzeContract(contractText);
            
            Map<String, Object> result = new HashMap<>();
            result.put("riskLevel", contract.getRiskLevel());
            result.put("opportunityLevel", contract.getOpportunityLevel());
            
            List<Map<String, String>> risksList = new ArrayList<>();
            for (Risk risk : contract.getRisks()) {
                Map<String, String> riskMap = new HashMap<>();
                riskMap.put("type", risk.getType());
                riskMap.put("severity", risk.getSeverity());
                riskMap.put("description", risk.getDescription());
                risksList.add(riskMap);
            }
            result.put("risks", risksList);
            
            List<Map<String, String>> opportunitiesList = new ArrayList<>();
            for (com.contractanalysis.service.Opportunity opportunity : contract.getOpportunities()) {
                Map<String, String> opportunityMap = new HashMap<>();
                opportunityMap.put("type", opportunity.getType());
                opportunityMap.put("impact", opportunity.getImpact());
                opportunityMap.put("description", opportunity.getDescription());
                opportunitiesList.add(opportunityMap);
            }
            result.put("opportunities", opportunitiesList);
            
            List<Map<String, String>> keyClausesList = new ArrayList<>();
            for (com.contractanalysis.service.KeyClause keyClause : contract.getKeyClauses()) {
                Map<String, String> keyClauseMap = new HashMap<>();
                keyClauseMap.put("title", keyClause.getTitle());
                keyClauseMap.put("description", keyClause.getDescription());
                keyClausesList.add(keyClauseMap);
            }
            result.put("keyClauses", keyClausesList);
            
            Map<String, Boolean> complianceMap = new HashMap<>();
            complianceMap.put("gdpr", contract.getCompliance().isGdpr());
            complianceMap.put("hipaa", contract.getCompliance().isHipaa());
            complianceMap.put("pci", contract.getCompliance().isPci());
            result.put("compliance", complianceMap);
            
            result.put("success", true);
            
            return result;
        } catch (Exception e) {
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("error", true);
            errorResult.put("message", "Error analyzing contract: " + e.getMessage());
            return errorResult;
        }
    }
    
    private String createAnalysisPrompt(String contractText) {
        return "You are a contract analysis expert. Analyze this contract text and provide a structured JSON response with ONLY the following fields: " +
               "1. riskLevel (integer from 0-100 representing overall risk) " +
               "2. opportunityLevel (integer from 0-100 representing overall opportunity) " +
               "3. risks (array of objects with type, severity [High, Medium, Low], and description) " +
               "4. opportunities (array of objects with type, impact [High, Medium, Low], and description) " +
               "5. keyClauses (array of objects with title and description) " +
               "6. compliance (object with boolean fields: gdpr, hipaa, pci indicating if the contract needs to comply with these regulations) " +
               "Format your response as a valid JSON object with these fields only. Do not include any explanations or additional text.\n\n" +
               "Contract text: " + contractText;
    }

    private String callGeminiApi(String prompt) {
        try {
            String url = GEMINI_URL + apiKey;
            
            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> contents = new HashMap<>();
            Map<String, Object> parts = new HashMap<>();
            
            parts.put("text", prompt);
            List<Map<String, Object>> partsList = new ArrayList<>();
            partsList.add(parts);
            
            contents.put("parts", partsList);
            List<Map<String, Object>> contentsList = new ArrayList<>();
            contentsList.add(contents);
            
            requestBody.put("contents", contentsList);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            String response = restTemplate.postForObject(url, entity, String.class);
            
            if (response == null || response.isEmpty()) {
                throw new RuntimeException("Empty response received from Gemini API");
            }
            
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Error calling Gemini API: " + e.getMessage(), e);
        }
    }

    private Contract parseGeminiResponse(String response, String originalText) {
        try {
            Contract contract = new Contract();
            contract.setText(originalText);
            
            JsonObject jsonResponse = gson.fromJson(response, JsonObject.class);
            String jsonContent = extractJsonContent(jsonResponse);
            
            if (jsonContent == null || jsonContent.isEmpty()) {
                throw new RuntimeException("Could not extract JSON content from Gemini response");
            }
            
            JsonObject analysisJson = gson.fromJson(jsonContent, JsonObject.class);
            
            if (analysisJson.has("riskLevel") && !analysisJson.get("riskLevel").isJsonNull()) {
                contract.setRiskLevel(analysisJson.get("riskLevel").getAsInt());
            } else {
                contract.setRiskLevel(50);
            }
            
            if (analysisJson.has("opportunityLevel") && !analysisJson.get("opportunityLevel").isJsonNull()) {
                contract.setOpportunityLevel(analysisJson.get("opportunityLevel").getAsInt());
            } else {
                contract.setOpportunityLevel(50);
            }
            
            List<Risk> risks = new ArrayList<>();
            if (analysisJson.has("risks") && analysisJson.get("risks").isJsonArray()) {
                JsonArray risksArray = analysisJson.get("risks").getAsJsonArray();
                for (JsonElement riskElement : risksArray) {
                    if (riskElement.isJsonObject()) {
                        JsonObject riskJson = riskElement.getAsJsonObject();
                        Risk risk = new Risk();
                        risk.setType(riskJson.has("type") ? riskJson.get("type").getAsString() : "Unknown");
                        risk.setSeverity(riskJson.has("severity") ? riskJson.get("severity").getAsString() : "Medium");
                        risk.setDescription(riskJson.has("description") ? riskJson.get("description").getAsString() : "No description provided");
                        risks.add(risk);
                    }
                }
            }
            contract.setRisks(risks);
            
            List<Opportunity> opportunities = new ArrayList<>();
            if (analysisJson.has("opportunities") && analysisJson.get("opportunities").isJsonArray()) {
                JsonArray opportunitiesArray = analysisJson.get("opportunities").getAsJsonArray();
                for (JsonElement opportunityElement : opportunitiesArray) {
                    if (opportunityElement.isJsonObject()) {
                        JsonObject opportunityJson = opportunityElement.getAsJsonObject();
                        Opportunity opportunity = new Opportunity();
                        opportunity.setType(opportunityJson.has("type") ? opportunityJson.get("type").getAsString() : "Unknown");
                        opportunity.setImpact(opportunityJson.has("impact") ? opportunityJson.get("impact").getAsString() : "Medium");
                        opportunity.setDescription(opportunityJson.has("description") ? opportunityJson.get("description").getAsString() : "No description provided");
                        opportunities.add(opportunity);
                    }
                }
            }
            contract.setOpportunityLevel(opportunities);
            
            List<KeyClause> keyClauses = new ArrayList<>();
            if (analysisJson.has("keyClauses") && analysisJson.get("keyClauses").isJsonArray()) {
                JsonArray keyClausesArray = analysisJson.get("keyClauses").getAsJsonArray();
                for (JsonElement keyClauseElement : keyClausesArray) {
                    if (keyClauseElement.isJsonObject()) {
                        JsonObject keyClauseJson = keyClauseElement.getAsJsonObject();
                        KeyClause keyClause = new KeyClause();
                        keyClause.setTitle(keyClauseJson.has("title") ? keyClauseJson.get("title").getAsString() : "Unknown");
                        keyClause.setDescription(keyClauseJson.has("description") ? keyClauseJson.get("description").getAsString() : "No description provided");
                        keyClauses.add(keyClause);
                    }
                }
            }
            contract.setKeyClauses(keyClauses);
            
            Compliance compliance = new Compliance();
            if (analysisJson.has("compliance") && analysisJson.get("compliance").isJsonObject()) {
                JsonObject complianceJson = analysisJson.get("compliance").getAsJsonObject();
                compliance.setGdpr(complianceJson.has("gdpr") ? complianceJson.get("gdpr").getAsBoolean() : false);
                compliance.setHipaa(complianceJson.has("hipaa") ? complianceJson.get("hipaa").getAsBoolean() : false);
                compliance.setPci(complianceJson.has("pci") ? complianceJson.get("pci").getAsBoolean() : false);
            }
            contract.setCompliance(compliance);
            
            return contract;
        } catch (Exception e) {
            System.err.println("Error parsing Gemini response: " + e.getMessage());
            e.printStackTrace();
            
            Contract contract = new Contract();
            contract.setText(originalText);
            contract.setRiskLevel(50);
            contract.setOpportunityLevel(50);
            
            List<Risk> risks = new ArrayList<>();
            Risk risk = new Risk();
            risk.setType("Parsing Error");
            risk.setSeverity("Medium");
            risk.setDescription("Unable to parse AI response: " + e.getMessage());
            risks.add(risk);
            contract.setRisks(risks);
            
            Compliance compliance = new Compliance();
            compliance.setGdpr(false);
            compliance.setHipaa(false);
            compliance.setPci(false);
            contract.setCompliance(compliance);
            
            return contract;
        }
    }
    
    private String extractJsonContent(JsonObject jsonResponse) {
        try {
            if (jsonResponse.has("candidates") && jsonResponse.get("candidates").isJsonArray()) {
                JsonArray candidates = jsonResponse.get("candidates").getAsJsonArray();
                
                if (candidates.size() > 0 && candidates.get(0).isJsonObject()) {
                    JsonObject candidate = candidates.get(0).getAsJsonObject();
                    
                    if (candidate.has("content") && candidate.get("content").isJsonObject()) {
                        JsonObject content = candidate.get("content").getAsJsonObject();
                        
                        if (content.has("parts") && content.get("parts").isJsonArray()) {
                            JsonArray parts = content.get("parts").getAsJsonArray();
                            
                            if (parts.size() > 0 && parts.get(0).isJsonObject()) {
                                JsonObject part = parts.get(0).getAsJsonObject();
                                
                                if (part.has("text") && part.get("text").isJsonPrimitive()) {
                                    String text = part.get("text").getAsString();
                                    
                                    int startIndex = text.indexOf('{');
                                    int endIndex = text.lastIndexOf('}');
                                    
                                    if (startIndex >= 0 && endIndex > startIndex) {
                                        return text.substring(startIndex, endIndex + 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            return null;
        } catch (Exception e) {
            System.err.println("Error extracting JSON content: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}