import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './addOfficers.css';
import Sidebar from './sideBar';

const AddOfficer = ({ mode = 'add' }) => { // Default mode is 'add'
    const navigate = useNavigate();
    const { id } = useParams(); // Get the officer ID from the URL for edit mode

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'officer',
        designation: '',
        fax: '',
    });

    // Fetch officer data for editing
    useEffect(() => {
        if (mode === 'edit' && id) {
            const fetchOfficer = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/offices/${id}`);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Error fetching officer:', error);
                }
            };
            fetchOfficer();
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
        return `${rolePart}123`; // Example: "officer123"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const password = generatePassword(formData.role);
            const officerData = {
                ...formData,
                password,
                inSeat: false,
            };

            if (mode === 'add') {
                // Add new officer
                await axios.post('http://localhost:5000/api/admin/offices', officerData);
                console.log('Officer added successfully');
            } else if (mode === 'edit' && id) {
                // Update existing officer
                await axios.put(`http://localhost:5000/api/admin/offices/${id}`, officerData);
                console.log('Officer updated successfully');
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
                <h2>{mode === 'add' ? 'Add New Officer' : 'Edit Officer'}</h2>
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

                    {/* Designation */}
                    <div className="form-group">
                        <label>Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Fax */}
                    <div className="form-group">
                        <label>Fax</label>
                        <input
                            type="text"
                            name="fax"
                            value={formData.fax}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">
                        {mode === 'add' ? 'Add Officer' : 'Update Officer'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOfficer;