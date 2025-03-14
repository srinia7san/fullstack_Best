package com.contractanalysis.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import com.contractanalysis.service.KeyClause;
import com.contractanalysis.service.Opportunity;

import java.util.Date;

@Entity
@Data
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Lob
    private String text;
    
    private int riskLevel;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Risk> risks;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Compliance compliance;
    
    private Date createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(int riskLevel) {
        this.riskLevel = riskLevel;
    }

    public List<Risk> getRisks() {
        return risks;
    }

    public void setRisks(List<Risk> risks) {
        this.risks = risks;
    }

    public Compliance getCompliance() {
        return compliance;
    }

    public void setCompliance(Compliance compliance) {
        this.compliance = compliance;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setOpportunityLevel(List<com.contractanalysis.model.Opportunity> opportunities) {
        // TODO Auto-generated method stub
    }

    public void setKeyClauses(List<com.contractanalysis.model.KeyClause> keyClauses) {
        // TODO Auto-generated method stub
    }

    public void setOpportunityLevel(int i) {
        // TODO Auto-generated method stub
    }

    public KeyClause[] getKeyClauses() {
        // TODO Auto-generated method stub
        return null;
    }

    public Opportunity[] getOpportunities() {
        // TODO Auto-generated method stub
        return null;
    }

    public Object getOpportunityLevel() {
        // TODO Auto-generated method stub
        return null;
    }
}