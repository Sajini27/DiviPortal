import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notification.css"; // New CSS file or reuse existing

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Please log in to view notifications.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching notifications");
        setLoading(false);
        console.error("Axios Error:", err);
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Please log in to mark notifications as read.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking as read:", err.response?.data);
      setError(err.response?.data?.message || "Error marking notification as read");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-notifications-container">
      <h1>Your Notifications</h1>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`notification-item ${notification.isRead ? "read" : "unread"}`}
            >
              <p>{notification.message}</p>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
              <br />
              {notification.relatedId && (
                <p>
                  Application Status: <span className={`status-${notification.relatedId.status.toLowerCase()}`}>
                    {notification.relatedId.status}
                  </span>
                </p>
              )}
              {!notification.isRead && (
                <button onClick={() => markAsRead(notification._id)}>
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserNotifications;