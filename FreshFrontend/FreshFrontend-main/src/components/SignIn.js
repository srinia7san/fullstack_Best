import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function SignIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, you would validate credentials with a backend
    // For this example, we'll simulate a successful login
    setTimeout(() => {
      onLogin();
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="auth-fullpage">
      <div className="auth-form-container">
        <h2>Log in to [name]</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="auth-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="auth-input"
            />
          </div>
          
          <div className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
          
          <button type="submit" className="auth-button">Log in</button>
        </form>
        
        <div className="auth-redirect">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;