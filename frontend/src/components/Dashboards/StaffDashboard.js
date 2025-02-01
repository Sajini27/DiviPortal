import React, { useState } from "react";
import "./StaffDashboard.css"; // Import CSS file for styling

const StaffDashboard = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarMinimized ? "minimized" : ""}`}>
        <div className="sidebar-header">
          <h3>Staff Dashboard</h3>
          <button onClick={toggleSidebar} className="minimize-btn">
            {isSidebarMinimized ? ">" : "<"}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>Home</li>
          <li>Payments</li>
          <li>Documents</li>
          <li>Appointments</li>
          <li>Notifications</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to the Staff Dashboard</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default StaffDashboard;