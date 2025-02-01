import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './addStaff.css';
import Sidebar from './sideBar';

const AddStaff = ({ mode = 'add' }) => { // Default mode is 'add'
    const navigate = useNavigate();
    const { id } = useParams(); // Get the Staff ID from the URL for edit mode

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'staff',
        division: '',
    });

    // Fetch Staff data for editing
    useEffect(() => {
        if (mode === 'edit' && id) {
            const fetchStaff = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/staff/${id}`);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Error fetching Staff:', error);
                }
            };
            fetchStaff();
        }
    }, [mode, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const generatePassword = (role) => {
        const rolePart = role.toLowerCase();
        return `${rolePart}123`; // Example: "Staff123"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const password = generatePassword(formData.role);
            const staffData = {
                ...formData,
                password
            };

            if (mode === 'add') {
                // Add new Staff
                await axios.post('http://localhost:5000/api/admin/staff', staffData);
                console.log('Staff added successfully');
            } else if (mode === 'edit' && id) {
                // Update existing Staff
                await axios.put(`http://localhost:5000/api/admin/staff/${id}`, staffData);
                console.log('Staff updated successfully');
            }

            navigate('/admin-dashboard'); // Redirect to admin dashboard
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className='dash-container'>
            <Sidebar />
            <div className="form-container">
                <h2>{mode === 'add' ? 'Add New Staff' : 'Edit Staff'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="form-group">
                        <label>Name</label>
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

                    {/* Phone */}
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* division */}
                    <div className="form-group">
                        <label>Division</label>
                        <input
                            type="text"
                            name="division"
                            value={formData.division}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">
                        {mode === 'add' ? 'Add Staff' : 'Update Staff'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddStaff;