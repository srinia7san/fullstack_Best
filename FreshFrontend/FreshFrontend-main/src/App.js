import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer'; // Import the Footer component
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrivacyPolicy from './components/PrivacyPolicy';
import AboutUs from './components/AboutUs'; // Import the AboutUs component
import './App.css';
import ContractHistory from './components/ContractHistory';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [analyzedContracts, setAnalyzedContracts] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleContractAnalysis = (contract) => {
    setAnalyzedContracts([...analyzedContracts, contract]);
  };

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onAnalyze={handleContractAnalysis} />} />
            <Route path="/dashboard" element={<Dashboard contracts={analyzedContracts || []} />} />
            <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/upload" element={<Home/>} />
            <Route path="/history" element={<ContractHistory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;