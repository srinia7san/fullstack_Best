package com.contractanalysis.service;

import com.contractanalysis.model.Contract;
import com.contractanalysis.model.Compliance;
import com.contractanalysis.model.Risk;
import com.contractanalysis.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    public Contract analyzeAndSaveContract(String contractText) {
        // Create a new contract
        Contract contract = new Contract();
        contract.setText(contractText);
        
        // Extract contract name from the text (first line or first 50 characters)
        String name = extractContractName(contractText);
        contract.setName(name);
        
        // Analyze the contract text
        List<Risk> risks = analyzeRisks(contractText);
        Compliance compliance = analyzeCompliance(contractText);
        
        // Calculate risk level (percentage based on risks)
        int riskLevel = calculateRiskLevel(risks);
        
        // Set the analyzed data
        contract.setRisks(risks);
        contract.setCompliance(compliance);
        contract.setRiskLevel(riskLevel);
        
        // Save to database
        return contractRepository.save(contract);
    }

    private String extractContractName(String contractText) {
        // Simple method to extract a contract name from text
        // Uses the first line or first 50 chars if no line break
        String firstLine = contractText.split("\n", 2)[0].trim();
        
        // If first line is too long, truncate it
        if (firstLine.length() > 50) {
            firstLine = firstLine.substring(0, 50) + "...";
        }
        
        return firstLine;
    }

    private List<Risk> analyzeRisks(String contractText) {
        // Your existing risk analysis logic
        // This is a placeholder - you'll need to replace with your actual implementation
        List<Risk> risks = new ArrayList<>();
        
        // Example risk analysis (replace with your actual logic)
        if (contractText.toLowerCase().contains("termination")) {
            Risk risk = new Risk();
            risk.setType("Termination Clause");
            risk.setSeverity("Medium");
            risk.setDescription("Contract contains an early termination clause that may be unfavorable.");
            risks.add(risk);
        }
        
        // Add more risk analysis logic here
        
        return risks;
    }

    private Compliance analyzeCompliance(String contractText) {
        // Your existing compliance analysis logic
        // This is a placeholder - you'll need to replace with your actual implementation
        Compliance compliance = new Compliance();
        
        // Example compliance analysis (replace with your actual logic)
        boolean hasGdpr = contractText.toLowerCase().contains("gdpr") || 
                          contractText.toLowerCase().contains("data protection");
        boolean hasHipaa = contractText.toLowerCase().contains("hipaa") || 
                           contractText.toLowerCase().contains("health information");
        boolean hasPci = contractText.toLowerCase().contains("pci") || 
                         contractText.toLowerCase().contains("payment card");
        
        compliance.setGdpr(hasGdpr);
        compliance.setHipaa(hasHipaa);
        compliance.setPci(hasPci);
        
        return compliance;
    }

    private int calculateRiskLevel(List<Risk> risks) {
        // Calculate overall risk level as a percentage
        if (risks.isEmpty()) {
            return 0;
        }
        
        int highRiskCount = 0;
        int mediumRiskCount = 0;
        int lowRiskCount = 0;
        
        for (Risk risk : risks) {
            switch (risk.getSeverity().toLowerCase()) {
                case "high":
                    highRiskCount++;
                    break;
                case "medium":
                    mediumRiskCount++;
                    break;
                case "low":
                    lowRiskCount++;
                    break;
            }
        }
        
        // Calculate weighted risk level (high=3, medium=2, low=1)
        int weightedRiskScore = (highRiskCount * 3) + (mediumRiskCount * 2) + lowRiskCount;
        int maxPossibleScore = risks.size() * 3;
        
        return (int) (((double) weightedRiskScore / maxPossibleScore) * 100);
    }

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public Contract getContractById(Long id) {
        Optional<Contract> contract = contractRepository.findById(id);
        return contract.orElse(null);
    }
}