import './StaffDashboard.css';
import Sidebar from './staffFunction/sideBar';

const StaffDashboard = () => {
  return (
    <div className="staff-dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Staff Dashboard</h1>
        <p className="dashboard-intro">
          Welcome to the Staff Dashboard. Here, you can manage your daily tasks efficiently, view and handle user bookings, update their status, and ensure smooth coordination across the division. This centralized space is designed to streamline your workflow,
          and provide better service to the community with accuracy and ease.
        </p>
      </div>
    </div>
  );
};

export default StaffDashboard;
