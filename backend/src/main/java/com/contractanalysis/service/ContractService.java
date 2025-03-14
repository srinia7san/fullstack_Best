package com.contractanalysis.service;

import com.contractanalysis.model.Contract;
import com.contractanalysis.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private GeminiService geminiService;

    public Contract analyzeAndSaveContract(String text) {
        if (text == null || text.trim().isEmpty()) {
            throw new IllegalArgumentException("Contract text cannot be empty");
        }
        
        // Truncate very long texts to prevent API limitations
        String truncatedText = text.length() > 30000 ? text.substring(0, 30000) : text;
        
        // Analyze the contract text using Gemini
        Contract analyzedContract = geminiService.analyzeContract(truncatedText);
        
        // Save the contract to the database
        return contractRepository.save(analyzedContract);
    }

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public Contract getContractById(Long id) {
        return contractRepository.findById(id).orElse(null);
    }
}