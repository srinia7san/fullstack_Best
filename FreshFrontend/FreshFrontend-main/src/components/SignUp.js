import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // In a real app, you would send this data to a backend
    // For this example, we'll simulate a successful registration
    setTimeout(() => {
      navigate('/signin');
    }, 1000);
  };

  return (
    <div className="auth-fullpage">
      <div className="auth-form-container">
        <h2>Sign up</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="auth-input"
            />
          </div>
          
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
          
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="auth-input"
            />
          </div>
          
          <button type="submit" className="auth-button">Sign up</button>
        </form>
        
        <div className="auth-redirect">
          Already have an account? <a href="/signin">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;