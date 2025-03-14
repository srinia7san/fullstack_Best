import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Our Team</h1>
        <p className="about-us-subtitle">Meet the developers behind CRAACC</p>
      </div>
      
      <div className="team-section">
        <div className="team-member">
          <div className="member-image-container">
            <img src="/api/placeholder/200/200" alt="Team Member 1" className="member-image" />
          </div>
          <div className="member-info">
            <h2>Surya TVK</h2>
            <p className="member-title">Full Stack Developer</p>
            <p className="member-description">
              John specializes in React and Node.js development. He was responsible for creating the frontend 
              architecture and implementing the document processing features of CRAACC. With over 5 years of 
              experience in web development, he brings a strong technical foundation to the team.
            </p>
          </div>
        </div>
        
        <div className="team-member">
          <div className="member-image-container">
            <img src="/api/placeholder/200/200" alt="Team Member 2" className="member-image" />
          </div>
          <div className="member-info">
            <h2>Udaya kumar</h2>
            <p className="member-title">Machine Learning Engineer</p>
            <p className="member-description">
              Jane is our AI expert with a focus on natural language processing. She developed the contract 
              analysis algorithms that power CRAACC's document understanding capabilities. Her background in 
              computational linguistics enables her to create sophisticated models for text analysis.
            </p>
          </div>
        </div>
        
        <div className="team-member">
          <div className="member-image-container">
          <img src="/images/sriniphoto.jpeg" alt="Team Member 3" className="member-image" />

          </div>
          <div className="member-info">
            <h2>Srinivasan </h2>
            <p className="member-title">UX/UI Designer</p>
            <p className="member-description">
              Alex leads the design efforts for CRAACC, focusing on creating intuitive interfaces for complex 
              document workflows. With a background in both legal tech and design, he ensures that our application 
              is not only visually appealing but also practical for everyday use in professional settings.
            </p>
          </div>
        </div>
      </div>
      
      <div className="about-project-section">
        <h2>Our Project</h2>
        <div className="project-content">
          <div className="project-image-container">
            <img src="/api/placeholder/400/300" alt="CRAACC Project" className="project-image" />
          </div>
          <div className="project-description">
            <p>
              CRAACC (Contract Review And Analysis Comprehensive Companion) is a state-of-the-art solution for 
              automating contract review processes. Our application leverages advanced machine learning techniques 
              to analyze legal documents, identify key clauses, and provide insights that help users make informed 
              decisions.
            </p>
            <p>
              We developed CRAACC to address the challenges faced by legal professionals, business owners, and 
              individuals when dealing with complex contractual agreements. By automating the review process, we 
              aim to save time, reduce errors, and improve overall contract management efficiency.
            </p>
            <p>
              The project was developed in Short Time, combining expertise in web development, 
              artificial intelligence, and legal document analysis. We continue to improve our algorithms and 
              add new features based on user feedback and emerging industry needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;