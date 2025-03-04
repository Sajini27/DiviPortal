import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import Sidebar from './adminFunctions/sideBar';

const AdminDashboard = () => {
  const { role, userName } = useContext(AppContext);
  const navigate = useNavigate();
  const [offices, setOffices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [users, setUsers] = useState([]); // This holds all user records

  // Fetch offices, staff, and users on component mount
  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
    } else {
      fetchOffices();
      fetchStaff();
      fetchUsers();
    }
  }, [role, navigate]);

  const fetchOffices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/offices');
      console.log('Fetched offices:', response.data);
      setOffices(response.data);
    } catch (error) {
      console.error('Error fetching offices:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/staff');
      console.log('Fetched staff:', response.data);
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Ensure this endpoint returns the users from the "User" model.
      // If backend returns all types,filter them here.
      const response = await axios.get('http://localhost:5000/api/admin/user');
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteOffice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/offices/${id}`);
      fetchOffices();
    } catch (error) {
      console.error('Error deleting office:', error);
    }
  };

  const handleDeleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Filter the users array so that only those with role === "user" are shown
  const filteredUsers = users.filter((user) => user.role === 'user');

  return (
    <div className="admin-dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <h1>Welcome, {userName}!</h1>

        <h2>Officers</h2>
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
                  <button onClick={() => navigate(`/admin/officers/edit/${office._id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteOffice(office._id)}>
                    Delete
                  </button>
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
              <th>Division</th>
              <th>Email</th>
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
                  <button onClick={() => navigate(`/admin/staff/edit/${staffMember._id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteStaff(staffMember._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Users</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => navigate(`/admin/user/edit/${user._id || user.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user._id || user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
