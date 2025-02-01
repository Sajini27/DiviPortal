// components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Admin Dashboard</h2>
            <ul className="sidebar-links">
                <li onClick={() => navigate('/admin-dashboard')}>DashBoard</li>
                <li onClick={() => navigate('/admin/officers')}>Add Offices</li>
                <li onClick={() => navigate('/admin/staff')}>Add Staff</li>
                <li onClick={() => navigate('/admin/user')}>Add User</li>
            </ul>
        </div>
    );
};

export default Sidebar;