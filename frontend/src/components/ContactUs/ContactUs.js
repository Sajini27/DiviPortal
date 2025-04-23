import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ContactUs.css';

function ContactUs() {
  const { token, role } = useContext(AppContext);
  const [officers, setOfficers] = useState([]); // State to store officers' data
  const navigate = useNavigate();

  // Fetch officers' data from the backend
  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/offices');
        setOfficers(response.data);
      } catch (error) {
        console.error('Error fetching officers:', error);
      }
    };
    fetchOfficers();
  }, []);

  // Check if the user is logged in by checking token
  const isLoggedIn = token !== null;

  // Navigate to the Bookings page for the selected officer
  const bookOfficer = (officer) => {
    if (!isLoggedIn) {
      alert("You must be logged in to make a booking.");
      window.location.href = '/login'; // Redirect to login page
      return;
    }
    navigate('/bookings', { state: officer });
  };

  const isAdmin = role === 'admin';

  // Toggle the "inSeat" status for an officer (Admin Only)
  const toggleInSeat = async (index) => {
    if (!isAdmin) return; // Only admins can modify

    try {
      const updatedOfficer = { ...officers[index], inSeat: !officers[index].inSeat };

      // Update the officer's inSeat status in the backend
      await axios.put(`http://localhost:5000/api/admin/offices/${updatedOfficer._id}`, { inSeat: updatedOfficer.inSeat });

      // Update the state correctly
      setOfficers((prevOfficers) => {
        const updatedOfficers = [...prevOfficers];
        updatedOfficers[index] = updatedOfficer;
        return updatedOfficers;
      });
    } catch (error) {
      console.error('Error updating officer:', error);
    }
  };

  return (
    <div className="contact-us-container">
      <h2 className="hotline-title">📞 Hotline: 045 22 62238</h2>

      <div className="contact-container">
        <h2>Officers</h2>
        <table className="officer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Telephone</th>
              <th>Fax</th>
              <th>In-Seat (Today)</th>
              {isAdmin && <th>Action</th>} {/* Conditionally render Action column */}
              <th>Booking Appointment</th>
              
            </tr>
          </thead>
          <tbody>
            {officers.map((officer, index) => (
              <tr key={officer._id}>
                <td>{officer.name}</td>
                <td>{officer.designation}</td>
                <td>{officer.phone}</td>
                <td>{officer.fax || '-'}</td>
                <td className={officer.inSeat ? 'in-seat-yes' : 'in-seat-no'}>
                  {officer.inSeat ? 'Yes' : 'No'}
                </td>
                {isAdmin && (
                  <td>
                    <button className="toggle-button" onClick={() => toggleInSeat(index)}>
                      {officer.inSeat ? 'Mark as Not In-Seat' : 'Mark as In-Seat'}
                    </button>
                  </td>
                )}
                <td>
                  <button className="toggle-button" onClick={() => bookOfficer(officer)}>
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactUs;
