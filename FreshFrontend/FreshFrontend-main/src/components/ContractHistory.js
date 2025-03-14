import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContractHistory.css';

function ContractHistory() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleViewContract = (contractId) => {
    navigate(`/contract/${contractId}`);
  };

  if (loading) {
    return (
      <div className="history-container history-loading">
        <div className="loader"></div>
        <h2>Loading contract history...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-container history-error">
        <div className="error-icon">!</div>
        <h2>Unable to retrieve contract history</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="history-container">
      <header className="history-header">
        <div className="history-title">
          <h1>Contract Analysis History</h1>
          <p>Review all previous contract analyses</p>
        </div>
        <div className="history-actions">
          <button className="action-button primary" onClick={() => navigate('/upload')}>
            <span className="icon analyze-icon"></span>
            New Analysis
          </button>
        </div>
      </header>

      <div className="contracts-list">
        {contracts.length === 0 ? (
          <div className="empty-history">
            <div className="empty-state-illustration"></div>
            <h2>No Analysis History</h2>
            <p>You haven't analyzed any contracts yet.</p>
            <button className="cta-button" onClick={() => navigate('/upload')}>
              Analyze Your First Contract
            </button>
          </div>
        ) : (
          <table className="contracts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Contract Name</th>
                <th>Date</th>
                <th>Risk Level</th>
                <th>Issues</th>
                <th>Compliance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => {
                // Calculate compliance percentage
                const complianceCount = [
                  contract.compliance.gdpr, 
                  contract.compliance.hipaa, 
                  contract.compliance.pci
                ].filter(Boolean).length;
                const compliancePercentage = Math.round((complianceCount / 3) * 100);

                return (
                  <tr key={contract.id}>
                    <td>{contract.id}</td>
                    <td>{contract.name || `Contract #${contract.id}`}</td>
                    <td>{new Date(contract.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`risk-badge ${getRiskClass(contract.riskLevel)}`}>
                        {contract.riskLevel}%
                      </span>
                    </td>
                    <td>{contract.risks.length} issues</td>
                    <td>
                      <span className={`compliance-badge ${compliancePercentage === 100 ? 'full' : 'partial'}`}>
                        {compliancePercentage}%
                      </span>
                    </td>
                    <td>
                      <button 
                        className="view-button" 
                        onClick={() => handleViewContract(contract.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function getRiskClass(level) {
  if (level < 30) return 'low-risk';
  if (level < 70) return 'medium-risk';
  return 'high-risk';
}

export default ContractHistory;