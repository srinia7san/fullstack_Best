import React, { useEffect, useState } from 'react';
import RiskCard from './RiskCard';
import ComplianceCard from './ComplianceCard';
import './Dashboard.css';

function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/contracts');
        if (!response.ok) {
          throw new Error('Failed to fetch contracts');
        }
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const safeContracts = contracts || [];

  if (loading) {
    return (
      <div className="dashboard-container dashboard-loading">
        <div className="loader"></div>
        <h2>Analyzing contract data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container dashboard-error">
        <div className="error-icon">!</div>
        <h2>Unable to retrieve contract data</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (safeContracts.length === 0) {
    return (
      <div className="dashboard-container empty-dashboard">
        <div className="empty-state-illustration"></div>
        <h1>No Contracts Available</h1>
        <p>Start by analyzing your first contract to view insights here.</p>
        <button className="cta-button" onClick={() => window.location.href = "/"}>
          Analyze Contract
        </button>
      </div>
    );
  }

  const latestContract = safeContracts[safeContracts.length - 1];
  const highRisks = latestContract.risks.filter(risk => risk.severity.toLowerCase() === 'high').length;
  const mediumRisks = latestContract.risks.filter(risk => risk.severity.toLowerCase() === 'medium').length;
  const lowRisks = latestContract.risks.filter(risk => risk.severity.toLowerCase() === 'low').length;
  
  // Calculate total compliant standards
  const complianceCount = [
    latestContract.compliance.gdpr, 
    latestContract.compliance.hipaa, 
    latestContract.compliance.pci
  ].filter(Boolean).length;
  
  const compliancePercentage = Math.round((complianceCount / 3) * 100);

  return (
    <div className="dashboard-container premium-dashboard">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>Contract Intelligence Hub</h1>
          <p className="contract-name">{latestContract.name || "Contract Analysis"}</p>
        </div>
        <div className="dashboard-actions">
          <button className="action-button">
            <span className="icon download-icon"></span>
            Export Report
          </button>
          <button className="action-button primary" onClick={() => window.location.href = "/upload"}>
  <span className="icon analyze-icon"></span>
  New Analysis
</button>
        </div>
      </header>
      
      <nav className="dashboard-tabs">
        <button 
          className={`tab-button ${selectedTab === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${selectedTab === 'risks' ? 'active' : ''}`}
          onClick={() => setSelectedTab('risks')}
        >
          Risk Assessment
        </button>
        <button 
          className={`tab-button ${selectedTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setSelectedTab('compliance')}
        >
          Compliance
        </button>
      </nav>

      <div className="dashboard-content">
        {selectedTab === 'overview' && (
          <>
            <div className="dashboard-summary">
              <div className="summary-card risk-summary">
                <div className="card-header">
                  <h3>Risk Assessment</h3>
                  <span className={`status-badge ${getRiskClass(latestContract.riskLevel)}`}>
                    {getRiskLabel(latestContract.riskLevel)}
                  </span>
                </div>
                <div className="risk-donut-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray={`${latestContract.riskLevel}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      style={{ stroke: getRiskColor(latestContract.riskLevel) }}
                    />
                    <text x="18" y="20.35" className="percentage">{latestContract.riskLevel}%</text>
                  </svg>
                </div>
                <div className="risk-breakdown">
                  <div className="risk-type">
                    <span className="risk-dot high"></span>
                    <span className="risk-label">High</span>
                    <span className="risk-count">{highRisks}</span>
                  </div>
                  <div className="risk-type">
                    <span className="risk-dot medium"></span>
                    <span className="risk-label">Medium</span>
                    <span className="risk-count">{mediumRisks}</span>
                  </div>
                  <div className="risk-type">
                    <span className="risk-dot low"></span>
                    <span className="risk-label">Low</span>
                    <span className="risk-count">{lowRisks}</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-card issue-summary">
                <div className="card-header">
                  <h3>Issues Identified</h3>
                  <span className="view-all">View all</span>
                </div>
                <div className="issue-counter">
                  <span className="issue-count">{latestContract.risks.length}</span>
                  <span className="issue-label">Total Issues</span>
                </div>
                <div className="issue-preview">
                  {latestContract.risks.slice(0, 2).map((risk, index) => (
                    <div key={index} className="mini-risk">
                      <span className={`mini-severity ${risk.severity.toLowerCase()}`}></span>
                      <span className="mini-type">{risk.type}</span>
                    </div>
                  ))}
                  {latestContract.risks.length > 2 && (
                    <div className="more-issues">
                      +{latestContract.risks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
              
              <div className="summary-card compliance-summary">
                <div className="card-header">
                  <h3>Compliance Status</h3>
                  <span className={`status-badge ${compliancePercentage === 100 ? 'compliant' : 'partial'}`}>
                    {compliancePercentage === 100 ? 'Fully Compliant' : 'Partially Compliant'}
                  </span>
                </div>
                <div className="compliance-meter">
                  <div className="meter-value" style={{ width: `${compliancePercentage}%` }}></div>
                </div>
                <div className="compliance-icons premium">
                  <div className={`compliance-badge ${latestContract.compliance.gdpr ? 'compliant' : 'non-compliant'}`}>
                    <span className="badge-icon gdpr"></span>
                    <span className="badge-text">GDPR</span>
                  </div>
                  <div className={`compliance-badge ${latestContract.compliance.hipaa ? 'compliant' : 'non-compliant'}`}>
                    <span className="badge-icon hipaa"></span>
                    <span className="badge-text">HIPAA</span>
                  </div>
                  <div className={`compliance-badge ${latestContract.compliance.pci ? 'compliant' : 'non-compliant'}`}>
                    <span className="badge-icon pci"></span>
                    <span className="badge-text">PCI DSS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-details">
              <div className="critical-risks-section">
                <div className="section-header">
                  <h2>Critical Risk Factors</h2>
                  <span className="section-subtitle">Highest priority issues requiring attention</span>
                </div>
                {latestContract.risks
                  .filter(risk => risk.severity.toLowerCase() === 'high')
                  .slice(0, 3)
                  .map((risk, index) => (
                    <RiskCard key={index} risk={risk} premium={true} />
                  ))}
                {latestContract.risks.filter(risk => risk.severity.toLowerCase() === 'high').length === 0 && (
                  <div className="no-risks-message">
                    <span className="checkmark-icon"></span>
                    <p>No critical risks detected in this contract</p>
                  </div>
                )}
              </div>

              <div className="compliance-detail-section">
                <div className="section-header">
                  <h2>Compliance Overview</h2>
                  <span className="section-subtitle">Regulatory standards assessment</span>
                </div>
                <ComplianceCard compliance={latestContract.compliance} premium={true} />
              </div>
            </div>
          </>
        )}

        {selectedTab === 'risks' && (
          <div className="risks-full-view">
            <div className="section-header with-filter">
              <div>
                <h2>Comprehensive Risk Assessment</h2>
                <span className="section-subtitle">All identified contract risks</span>
              </div>
              <div className="risk-filters">
                <select className="filter-dropdown">
                  <option value="all">All Severities</option>
                  <option value="high">High Only</option>
                  <option value="medium">Medium Only</option>
                  <option value="low">Low Only</option>
                </select>
                <select className="filter-dropdown">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
            <div className="risks-grid">
              {latestContract.risks.map((risk, index) => (
                <RiskCard key={index} risk={risk} premium={true} expanded={true} />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'compliance' && (
          <div className="compliance-full-view">
            <div className="section-header">
              <h2>Compliance Details</h2>
              <span className="section-subtitle">In-depth regulatory compliance analysis</span>
            </div>
            <div className="compliance-dashboard">
              <div className="compliance-overview">
                <div className="compliance-chart">
                  <div className="donut-chart">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path className="circle"
                        strokeDasharray={`${compliancePercentage}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        style={{ stroke: compliancePercentage === 100 ? '#4CAF50' : '#FFC107' }}
                      />
                      <text x="18" y="20.35" className="percentage">{compliancePercentage}%</text>
                    </svg>
                  </div>
                  <div className="compliance-status-text">
                    <h3>{compliancePercentage === 100 ? 'Fully Compliant' : 'Partially Compliant'}</h3>
                    <p>{complianceCount} of 3 standards met</p>
                  </div>
                </div>
              </div>
              <div className="compliance-details-expanded">
                <ComplianceCard compliance={latestContract.compliance} premium={true} expanded={true} />
              </div>
              <div className="compliance-recommendations">
                <h3>Recommended Actions</h3>
                <ul className="action-list">
                  {!latestContract.compliance.gdpr && (
                    <li className="action-item">
                      <span className="action-icon gdpr"></span>
                      <div className="action-text">
                        <h4>GDPR Compliance</h4>
                        <p>Update data handling procedures to comply with EU citizen data protection requirements</p>
                      </div>
                    </li>
                  )}
                  {!latestContract.compliance.hipaa && (
                    <li className="action-item">
                      <span className="action-icon hipaa"></span>
                      <div className="action-text">
                        <h4>HIPAA Compliance</h4>
                        <p>Add required clauses for health information protection and security measures</p>
                      </div>
                    </li>
                  )}
                  {!latestContract.compliance.pci && (
                    <li className="action-item">
                      <span className="action-icon pci"></span>
                      <div className="action-text">
                        <h4>PCI DSS Compliance</h4>
                        <p>Implement stronger safeguards for handling payment card information</p>
                      </div>
                    </li>
                  )}
                  {compliancePercentage === 100 && (
                    <li className="action-item compliant">
                      <span className="action-icon check"></span>
                      <div className="action-text">
                        <h4>Fully Compliant</h4>
                        <p>This contract meets all regulatory compliance standards</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}function getRiskColor(level) {
  if (level < 30) return '#4CAF50'; // Green for low risk
  if (level < 70) return '#FFC107'; // Yellow for medium risk
  return '#F44336'; // Red for high risk
}

function getRiskLabel(level) {
  if (level < 30) return 'Low Risk';
  if (level < 70) return 'Medium Risk';
  return 'High Risk';
}

function getRiskClass(level) {
  if (level < 30) return 'low-risk';
  if (level < 70) return 'medium-risk';
  return 'high-risk';
}

export default Dashboard;