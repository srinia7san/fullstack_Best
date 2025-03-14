import React from 'react';
import './ComplianceCard.css';

function ComplianceCard({ compliance }) {
  const complianceDetails = [
    {
      name: 'GDPR',
      compliant: compliance.gdpr,
      description: 'General Data Protection Regulation compliance for handling personal data of EU citizens.'
    },
    {
      name: 'HIPAA',
      compliant: compliance.hipaa,
      description: 'Health Insurance Portability and Accountability Act compliance for protecting health information.'
    },
    {
      name: 'PCI DSS',
      compliant: compliance.pci,
      description: 'Payment Card Industry Data Security Standard compliance for handling card transactions.'
    }
  ];

  return (
    <div className="compliance-card">
      {complianceDetails.map((item, index) => (
        <div key={index} className="compliance-item">
          <div className="compliance-header">
            <h3>{item.name}</h3>
            <span className={`compliance-status ${item.compliant ? 'compliant' : 'non-compliant'}`}>
              {item.compliant ? 'Compliant' : 'Non-Compliant'}
            </span>
          </div>
          <p className="compliance-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ComplianceCard;