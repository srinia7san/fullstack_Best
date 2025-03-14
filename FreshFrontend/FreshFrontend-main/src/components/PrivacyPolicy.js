import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <div className="last-updated">Last Updated: March 12, 2025</div>
      
      <section className="policy-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to CRAACC. We are committed to protecting your privacy and ensuring 
          the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
          and safeguard your information when you use our contract analysis services.
        </p>
        <p>
          By using our services, you consent to the practices described in this Privacy Policy.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <p>We may collect the following information that you provide to us:</p>
        <ul>
          <li>Account information (name, email address, company name)</li>
          <li>Contract documents and content submitted for analysis</li>
          <li>Feedback and correspondence (survey responses, customer support)</li>
          <li>Transaction information (billing details, subscription information)</li>
        </ul>
        
        <h3>2.2 Automatically Collected Information</h3>
        <p>We automatically collect certain information when you use our services:</p>
        <ul>
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage data (features accessed, analysis performed, time spent)</li>
          <li>Log information (access times, pages viewed, referral URLs)</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Provide, maintain, and improve our contract analysis services</li>
          <li>Process transactions and manage your account</li>
          <li>Send you technical notices, updates, and administrative messages</li>
          <li>Respond to your comments, questions, and customer service requests</li>
          <li>Monitor and analyze trends, usage, and activities to improve user experience</li>
          <li>Detect, investigate, and prevent fraudulent transactions and unauthorized access</li>
          <li>Develop new features and services based on user feedback and needs</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>4. Contract Data and AI Analysis</h2>
        <p>
          When you upload contracts for analysis, our AI system processes the content to identify risks, 
          compliance issues, and other contractual elements. We take the following measures to protect 
          your contract data:
        </p>
        <ul>
          <li>All contracts are encrypted during transmission and storage</li>
          <li>Access to contract data is strictly limited to authorized personnel</li>
          <li>Contract data is only used for the specific analysis you request</li>
          <li>You maintain ownership of all content you submit</li>
        </ul>
        <p>
          By default, we do not use your contract data to train or improve our AI models. You may opt-in to 
          allow anonymized usage of your data for service improvement purposes.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>5. Data Sharing and Disclosure</h2>
        <p>We may share your information in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> We work with third-party service providers who perform services on our behalf, such as hosting, analytics, and customer support.</li>
          <li><strong>Compliance with Laws:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.</li>
          <li><strong>With Your Consent:</strong> We may share information with third parties when you have given us your consent to do so.</li>
        </ul>
        <p>
          We do not sell, rent, or lease your personal information to third parties.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your information from 
          unauthorized access, loss, destruction, or alteration. However, no security system is impenetrable, 
          and we cannot guarantee the absolute security of our databases.
        </p>
        <p>
          We maintain security measures including:
        </p>
        <ul>
          <li>Encryption of sensitive data at rest and in transit</li>
          <li>Regular security assessments and penetration testing</li>
          <li>Access controls and authentication procedures</li>
          <li>Continuous monitoring for suspicious activities</li>
        </ul>
      </section>
      
      <section className="policy-section">
        <h2>7. Your Rights and Choices</h2>
        <p>You have several rights regarding your personal information:</p>
        <ul>
          <li><strong>Access and Update:</strong> You can access and update your account information through your profile settings.</li>
          <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
          <li><strong>Deletion:</strong> You can request deletion of your personal information and contract data.</li>
          <li><strong>Objection:</strong> You can object to our processing of your personal information.</li>
          <li><strong>Marketing Communications:</strong> You can opt out of marketing communications at any time.</li>
        </ul>
        <p>
          To exercise these rights, please contact us at privacy@craacc.com.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>8. Retention Period</h2>
        <p>
          We retain your information for as long as necessary to provide our services, comply with legal 
          obligations, resolve disputes, and enforce our agreements. When we no longer need to use your 
          information, we will securely delete or anonymize it.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>9. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. 
          These countries may have different data protection laws. We take appropriate safeguards to ensure your 
          information remains protected in accordance with this Privacy Policy.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>10. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
          updated Privacy Policy on our website or through other communications.
        </p>
      </section>
      
      <section className="policy-section">
        <h2>11. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
          please contact us at:
        </p>
        <p className="contact-info">
          CRAACC Privacy Team<br />
          Email: privacy@craacc.com<br />
          Address: Dubai MainRoad
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;