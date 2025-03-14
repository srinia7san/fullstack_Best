package com.contractanalysis.controller;

import com.contractanalysis.model.Contract;
import com.contractanalysis.service.ContractService;
import com.contractanalysis.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Added back CORS support
@RequestMapping("/api/contracts")
public class ContractController {

    private static final Logger logger = LoggerFactory.getLogger(ContractController.class);  // Added back logging

    @Autowired
    private ContractService contractService;

    @Autowired
    private PdfService pdfService;

    @GetMapping("/test")  // Added back test endpoint
    public ResponseEntity<String> testEndpoint() {
        logger.info("Test endpoint called");
        return ResponseEntity.ok("Backend is working!");
    }

    @PostMapping("/analyze")
    public ResponseEntity<Contract> analyzeContract(@RequestBody String contractText) {
        logger.info("Analyze contract endpoint called");
        Contract analyzedContract = contractService.analyzeAndSaveContract(contractText);
        return ResponseEntity.ok(analyzedContract);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPdf(@RequestParam("file") MultipartFile file) {
        logger.info("Received file upload request. Filename: {}", file.getOriginalFilename());
        try {
            logger.info("File size: {} bytes", file.getSize());
            String extractedText = pdfService.extractTextFromPdf(file);
            
            if (extractedText == null || extractedText.trim().isEmpty()) {
                logger.error("No text extracted from PDF");
                return ResponseEntity.badRequest().body("No text could be extracted from the PDF file");
            }
            
            logger.info("Successfully extracted text from PDF, length: {}", extractedText.length());
            Contract analyzedContract = contractService.analyzeAndSaveContract(extractedText);
            logger.info("Contract analyzed and saved with ID: {}", analyzedContract.getId());
            return ResponseEntity.ok(analyzedContract);
        } catch (IOException e) {
            logger.error("IOException during PDF processing", e);
            return ResponseEntity.badRequest().body("Failed to process PDF: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error analyzing contract", e);
            return ResponseEntity.badRequest().body("Error analyzing contract: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Contract>> getAllContracts() {
        logger.info("Get all contracts endpoint called");
        return ResponseEntity.ok(contractService.getAllContracts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(@PathVariable Long id) {
        logger.info("Get contract by ID endpoint called: {}", id);
        Contract contract = contractService.getContractById(id);
        if (contract != null) {
            return ResponseEntity.ok(contract);
        } else {
            logger.warn("Contract not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        }
    }
}