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

    useEffect(() => {
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        const officerId = localStorage.getItem('userId');

        if (role !== 'officer') {
            navigate('/');
            return;
        }

        setOfficerData({ name, role, officerId });

        if (officerId) {
            fetchBookings(officerId);
        }
    }, [navigate]);

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

    const updateBookingStatus = async (bookingId, currentStatus) => {
        let newStatus;
        if (currentStatus === 'Pending') {
            newStatus = 'Accepted';
        } else if (currentStatus === 'Accepted') {
            newStatus = 'Done';
        } else {
            return;
        }

        try {
            const { data: updatedBooking } = await axios.put(
                `http://localhost:5000/api/admin/bookings/${bookingId}`,
                { status: newStatus }
            );

            setBookings(prev =>
                prev.map(booking =>
                    booking._id === updatedBooking._id ? updatedBooking : booking
                )
            );

            if (newStatus === 'Accepted') {
                await axios.post('http://localhost:5000/api/notifications', {
                    userId: updatedBooking.userId,
                    message: `Your booking (ID: ${bookingId}) has been accepted.`
                });
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Failed to update status');
        }
    };

    return (
        <div className="officer-dashboard">
            <div className="dashboard-header">
                <h1>Welcome, Officer Dashboard</h1>
                <p>Role: {officerData.role}</p>
            </div>

            <div className="bookings-section">
                <h2>My Bookings</h2>
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : error ? (
                    <p className="error-message">Error: {error}</p>
                ) : bookings.length === 0 ? (
                    <p className="no-bookings">No bookings found.</p>
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
                                    <td>
                                        <button
                                            className={`status-button ${booking.status.toLowerCase()}`}
                                            onClick={() => updateBookingStatus(booking._id, booking.status)}
                                            disabled={booking.status === 'Done'}>
                                            {booking.status}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OfficerDashboard;
