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
        if (currentStatus === 'Pending') newStatus = 'Accepted';
        else if (currentStatus === 'Accepted') newStatus = 'Done';
        else return;

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
                // Send notification to the user
                await axios.post('http://localhost:5000/api/notifications', {
                    userId: updatedBooking.userId._id,
                    message: `Your appointment (Booking ID: ${bookingId}) has been accepted.`,
                    relatedBooking: bookingId,
                });
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Failed to update status');
        }
    };

    const deleteBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/admin/bookings/${bookingId}`);
            setBookings(prev => prev.filter(booking => booking._id !== bookingId));
        } catch (err) {
            console.error('Delete error:', err);
            setError(err.response?.data?.message || 'Failed to delete booking');
        }
    };

    const groupBookingsByMonth = (bookings) => {
        const grouped = {};
        bookings.forEach((booking) => {
            const date = new Date(booking.date);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(booking);
        });
        return grouped;
    };

    const formatMonthYear = (key) => {
        const [year, month] = key.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const groupedBookings = groupBookingsByMonth(bookings);

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
                    Object.entries(groupedBookings).map(([key, monthBookings]) => (
                        <div key={key} className="monthly-table">
                            <h3 className="month-title">{formatMonthYear(key)}</h3>
                            <table className="bookings-table">
                                <thead>
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthBookings.map((booking) => (
                                        <tr key={booking._id}>
                                            <td>{booking._id}</td>
                                            <td>{booking.userId?.name || 'N/A'}</td>
                                            <td>{booking.userId?.email || 'N/A'}</td>
                                            <td>{new Date(booking.date).toLocaleString()}</td>
                                            <td>
                                                <button
                                                    className={`status-button ${booking.status.toLowerCase()}`}
                                                    onClick={() => updateBookingStatus(booking._id, booking.status)}
                                                    disabled={booking.status === 'Done'}
                                                >
                                                    {booking.status}
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => deleteBooking(booking._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OfficerDashboard;
