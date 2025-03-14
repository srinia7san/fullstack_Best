package com.contractanalysis.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.contractanalysis.model.Contract;

import java.io.IOException;
import java.util.Map;

@Service
public class PdfService {
    
    @Autowired
    private GeminiService geminiService;
    
    /**
     * Extracts text from a PDF file
     * 
     * @param file The PDF file to extract text from
     * @return The extracted text
     * @throws IOException If there's an error processing the file
     */
    public String extractTextFromPdf(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("PDF file cannot be empty");
        }
        
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            throw new IllegalArgumentException("File must be a PDF");
        }
        
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            if (document.isEncrypted()) {
                throw new IOException("Cannot process encrypted PDF files");
            }
            
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
    
    /**
     * Analyzes a PDF file and returns a Contract object with analysis results
     * 
     * @param file The PDF file to analyze
     * @return A Contract object containing analysis results
     * @throws IOException If there's an error processing the file
     */
    public Contract analyzeContractPdf(MultipartFile file) throws IOException {
        // First extract the text from the PDF
        String pdfText = extractTextFromPdf(file);
        
        // Then use GeminiService to analyze the text and get a Contract object
        return geminiService.analyzeContract(pdfText);
    }
    
    /**
     * Analyzes a PDF file using the GeminiService and returns a Map for API responses
     * 
     * @param file The PDF file to analyze
     * @return A Map containing the analysis results
     * @throws IOException If there's an error processing the file
     */
    public Map<String, Object> analyzePdfContent(MultipartFile file) throws IOException {
        // First extract the text from the PDF
        String pdfText = extractTextFromPdf(file);
        
        // Then use GeminiService to analyze the text
        return geminiService.analyzeContractText(pdfText);
    }
}