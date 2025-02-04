import React, { useState } from 'react';
import axios from 'axios';
import './SamurdhiCheck.css';

const SamurdhiCheck = () => {
  const [idNumber, setIdNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!idNumber.trim()) {
      setError('Please enter a valid ID number.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/samurdhi/search/${idNumber}`);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error fetching record. Please try again.');
    }
  };

  return (
    <div className="samurdhi-check-container">
      <h2>Check Samurdhi Status</h2>
      <form onSubmit={handleSubmit} className="samurdhi-check-form">
        <div className="form-group">
          <label htmlFor="idNumber">Enter ID Number:</label>
          <input
            type="text"
            id="idNumber"
            value={idNumber}
            onChange={handleInputChange}
            placeholder="Enter ID number"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Check Status</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result-container">
          <h3>Samurdhi Record</h3>
          <div className="result-details">
            <p><strong>Name with Initials:</strong> {result.nameWithInitials}</p>
            <p><strong>ID Number:</strong> {result.idNumber}</p>
            <p><strong>Has Samurdhi:</strong> {result.hasSamurdhi ? 'Yes' : 'No'}</p>
            {result.hasSamurdhi && (
              <p><strong>Amount (Rupees):</strong> {result.amount}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SamurdhiCheck;