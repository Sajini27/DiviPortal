import { useState } from 'react';
import './forgot.css';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send to backend API (placeholder)
      console.log('Sending password reset to:', email);
      setMessage('If an account with that email exists, a reset link has been sent.');
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-box" onSubmit={handleSubmit}>
        <h2 className="forgot-title">Reset Password</h2>
        <p className="forgot-subtitle">Enter your email to receive a reset link.</p>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="forgot-button">
          Send Reset Link
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default Forgot;
