import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import Sidebar from './adminFunctions/sideBar';

const AdminDashboard = () => {
    const { role, userName} = useContext(AppContext);
    const navigate = useNavigate();
    const [offices, setOffices] = useState([]);
    const [staff, setStaff] = useState([]);

    // Fetch offices and staff on component mount
    useEffect(() => {
        if (role !== 'admin') {
            navigate('/'); 
        } else {
            fetchOffices();
            fetchStaff();
        }
    }, [role, navigate]);

    const fetchOffices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/offices');
            setOffices(response.data);
        } catch (error) {
            console.error('Error fetching offices:', error);
        }
    };

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/staff');
            setStaff(response.data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        }
    };

    const handleDeleteOffice = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/offices/${id}`);
            fetchOffices(); // Refresh the list
        } catch (error) {
            console.error('Error deleting office:', error);
        }
    };

    const handleDeleteStaff = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/staff/${id}`);
            fetchStaff(); // Refresh the list
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="dashboard-content">
                <h1>Welcome, {userName}!</h1>

                <h2>Offices</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offices.map((office) => (
                            <tr key={office._id}>
                                <td>{office.name}</td>
                                <td>{office.designation}</td>
                                <td>{office.email}</td>
                                <td>
                                    <button onClick={() => navigate(`/admin/officers/edit/${office._id}`)}>Edit</button>
                                    <button onClick={() => handleDeleteOffice(office._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Staff</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Devision</th>
                            <th>email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((staffMember) => (
                            <tr key={staffMember._id}>
                                <td>{staffMember.name}</td>
                                <td>{staffMember.division}</td>
                                <td>{staffMember.email}</td>
                                <td>
                                    <button onClick={() => navigate(`/admin/staff/edit/${staffMember._id}`)}>Edit</button>
                                    <button onClick={() => handleDeleteStaff(staffMember._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;