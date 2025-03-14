import React from 'react';
import './RiskCard.css';

function RiskCard({ risk, premium, expanded }) {
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FFC107';
      case 'low':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <div className={`risk-card ${premium ? 'premium' : ''} ${expanded ? 'expanded' : ''}`}>
      <div 
        className="severity-indicator" 
        style={{ backgroundColor: getSeverityColor(risk.severity) }}
      ></div>
      <div className="risk-content">
        <h3>{risk.type}</h3>
        <p className={`severity ${risk.severity.toLowerCase()}`}>{risk.severity} Severity</p>
        <p className="description">{risk.description}</p>
      </div>
    </div>
  );
}

export default RiskCard;