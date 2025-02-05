import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './addUser.css';
import Sidebar from './sideBar';

const AddUser = ({ mode = 'add' }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Used for edit mode

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  // Fetch user data for editing
  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/admin/user/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching User:', error);
        }
      };
      fetchUser();
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePassword = (role) => {
    return `${role.toLowerCase()}123`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const password = generatePassword(formData.role);
      const userData = {
        ...formData,
        password,
      };

      if (mode === 'add') {
        // Add new user
        await axios.post('http://localhost:5000/api/admin/user', userData);
        console.log('User added successfully');
      } else if (mode === 'edit' && id) {
        // Update existing user
        await axios.put(`http://localhost:5000/api/admin/user/${id}`, userData);
        console.log('User updated successfully');
      }

      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="dash-container">
      <Sidebar />
      <div className="form-container">
        <h2>{mode === 'add' ? 'Add New User' : 'Edit User'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name with initials</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            {mode === 'add' ? 'Add User' : 'Update User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
