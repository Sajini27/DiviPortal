import React, { useState, useEffect } from "react";
import Sidebar from "./sideBar";
import axios from "axios";
import "./CivilRegistrationForm.css";

const NotifyStaff = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("authToken"); // Consistent key
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        console.log("Sending request with token:", token);
        const response = await axios.get("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Notifications fetched:", response.data);
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Error fetching notifications";
        setError(errorMessage);
        setLoading(false);
        console.error("Full Axios Error:", err);
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem("authToken"); // Consistent key
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
      // Only update state if the server confirms success
      if (response.data && response.data.isRead) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
      }
    } catch (err) {
      console.error("Error marking as read:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to mark notification as read");
    }
  };

  if (loading) return <div className="staff-dashboard-container"><Sidebar /><div className="main-content">Loading...</div></div>;
  if (error) return <div className="staff-dashboard-container"><Sidebar /><div className="main-content">{error}</div></div>;

  return (
    <div className="staff-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Notifications</h1>
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
                <a
                  href={`${notification.path}`} // Ensure this is valid or adjust as needed
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Submission
                </a>
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
    </div>
  );
};

export default NotifyStaff;