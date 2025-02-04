import "./StaffDashboard.css";
import Sidebar from './staffFunction/sideBar';

const StaffDashboard = () => {


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to the Staff Dashboard</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default StaffDashboard;
