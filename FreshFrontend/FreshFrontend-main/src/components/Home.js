import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from './FileUploader';
import { analyzeContractText } from '../services/api';
import './Home.css';

function Home({ onAnalyze }) {
  const [contractText, setContractText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setContractText(e.target.value);
  };

  const handleFileUpload = (analysisResult) => {
    onAnalyze(analysisResult);
    navigate('/dashboard');
  };

  const handleSubmit = async () => {
    if (!contractText.trim()) {
      alert('Please enter contract text or upload a file');
      return;
    }

    setIsLoading(true);

    try {
      const analysisResult = await analyzeContractText(contractText);
      onAnalyze(analysisResult);
      setIsLoading(false);
      setContractText('');
      navigate('/dashboard');
    } catch (error) {
      setIsLoading(false);
      alert('Error analyzing the contract. Please try again.');
    }
  };

  const toggleUploader = () => {
    setShowUploader(true);
  };

  return (
    <div className="home-container">
      <div className="banner">
        <span className="announcement">
          <span className="icon">✨</span>AI Powered Contract Analysis
        </span>
      </div>
      
      <div className="hero-section">
        <h1>Analyze Your Contracts</h1>
        <p className="subtitle">
          Harness the power of AI to analyze, understand, and optimize your contracts in no time.
        </p>
        
        <div className="cta-buttons">
          <button className="primary-btn" onClick={toggleUploader}>
            Get Started <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {showUploader && (
        <div className="analyzer-section">
          <div className="text-input-container">
            <textarea
              className="contract-text-area"
              placeholder="Enter Contract Text Here"
              value={contractText}
              onChange={handleTextChange}
            />
            <div className="upload-container">
              <FileUploader onFileLoad={handleFileUpload} />
            </div>
          </div>

          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Contract'}
          </button>
        </div>
      )}

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon document-icon"></div>
          <h3>AI-powered Analysis</h3>
          <p>Leverage advanced AI to analyze contracts quickly and accurately.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon shield-icon"></div>
          <h3>Risk Identification</h3>
          <p>Spot potential risks and opportunities in your contracts.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon clock-icon"></div>
          <h3>Streamlined Negotiation</h3>
          <p>Accelerate the negotiation process with AI-driven insights.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon savings-icon"></div>
          <h3>Cost Savings</h3>
          <p>Reduce legal fees and negotiation costs through smart automation.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon balance-icon"></div>
          <h3>Compliance Assurance</h3>
          <p>Ensure your contracts comply with relevant regulations and standards.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon lightning-icon"></div>
          <h3>Fast Turnaround</h3>
          <p>Get comprehensive analysis in seconds, not days or weeks.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;