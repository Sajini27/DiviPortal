import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, [userId]);

    const markAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
            setNotifications(notifications.map(notification => 
                notification._id === id ? { ...notification, read: true } : notification
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className="user-dashboard">
            <h1>Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications found.</p>
            ) : (
                <ul className="notifications-list">
                    {notifications.map(notification => (
                        <li key={notification._id} className={notification.read ? 'read' : 'unread'}>
                            <p>{notification.message}</p>
                            {!notification.read && (
                                <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;