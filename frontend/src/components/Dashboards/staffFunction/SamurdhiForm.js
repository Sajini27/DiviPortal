import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SamurdhiForm.css';

const SamurdhiProgramme = () => {
  const [formData, setFormData] = useState({
    nameWithInitials: '',
    idNumber: '',
    hasSamurdhi: false,
    amount: ''
  });
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  // Fetch existing entries from the backend
  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/samurdhi');
      setEntries(response.data);
    } catch (err) {
      console.error('Error fetching Samurdhi entries:', err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      amount: formData.hasSamurdhi ? parseFloat(formData.amount) : 0
    };

    try {
      await axios.post('http://localhost:5000/api/samurdhi', dataToSend);
      setFormData({
        nameWithInitials: '',
        idNumber: '',
        hasSamurdhi: false,
        amount: ''
      });
      fetchEntries();
    } catch (err) {
      console.error('Error adding Samurdhi entry:', err);
      setError("Failed to add entry");
    }
  };

  // Handle deletion of an entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/samurdhi/${id}`);
      fetchEntries();
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  return (
    <div className="samurdhi-container">
      <h2>Samurdhi Programme</h2>
      <form onSubmit={handleSubmit} className="samurdhi-form">
        <div className="form-group">
          <label>Name with Initials:</label>
          <input
            type="text"
            name="nameWithInitials"
            value={formData.nameWithInitials}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ID Number:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="hasSamurdhi"
              checked={formData.hasSamurdhi}
              onChange={handleChange}
            />
            Has Samurdhi?
          </label>
        </div>
        {formData.hasSamurdhi && (
          <div className="form-group">
            <label>Amount (in rupees):</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required={formData.hasSamurdhi}
            />
          </div>
        )}
        <button type="submit" className="submit-btn">Add Citizen</button>
      </form>
      {error && <p className="error">{error}</p>}
      <h3>Samurdhi Programme Entries</h3>
      <table className="samurdhi-table">
        <thead>
          <tr>
            <th>Name with Initials</th>
            <th>ID Number</th>
            <th>Has Samurdhi</th>
            <th>Amount (Rupees)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry._id}>
              <td>{entry.nameWithInitials}</td>
              <td>{entry.idNumber}</td>
              <td>{entry.hasSamurdhi ? "Yes" : "No"}</td>
              <td>{entry.hasSamurdhi ? entry.amount : '-'}</td>
              <td>
                <button onClick={() => handleDelete(entry._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SamurdhiProgramme;