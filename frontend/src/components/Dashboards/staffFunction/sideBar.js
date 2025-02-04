// components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Staff Dashboard</h2>
            <ul className="sidebar-links">
                <li onClick={() => navigate('/samurdhi')}>Samurdhi Programme</li>
            </ul>
        </div>
    );
};

export default Sidebar;

