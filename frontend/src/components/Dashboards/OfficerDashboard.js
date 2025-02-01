import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './officerDashboard.css';

const OfficerDashboard = () => {
    const [officerData, setOfficerData] = useState({ name: '', role: '', officerId: '' });
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Load officer data from localStorage
    useEffect(() => {
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        const officerId = localStorage.getItem('userId'); 

        if (role !== 'officer') {
            navigate('/'); 
            return;
        }

        setOfficerData({ name, role, officerId });

        // Fetch officer bookings
        if (officerId) {
            fetchBookings(officerId);
        }
    }, [navigate]);

    // Function to fetch bookings
    const fetchBookings = async (officerId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/bookings/${officerId}`);
            setBookings(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="officer-dashboard">
            <h1>Welcome, Officer {officerData.name}!</h1>
            <p>Role: {officerData.role}</p>


            <h2>My Bookings</h2>
            {loading ? (
                <p>Loading bookings...</p>
            ) : error ? (
                <p className="error-message">Error: {error}</p>
            ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking._id}</td>
                                <td>{booking.userId?.name || 'N/A'}</td>
                                <td>{booking.userId?.email || 'N/A'}</td>
                                <td>{new Date(booking.date).toLocaleString()}</td>
                                <td>{booking.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OfficerDashboard;
