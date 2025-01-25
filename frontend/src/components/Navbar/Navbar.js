import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import R from '../../assets/R.png';
import profile_pic from '../../assets/profile_pic.png'; // Import profile picture
import dropdown_icon from '../../assets/dropdown_icon.svg'; // Import dropdown icon

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);
  const [sticky, setSticky] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref to detect click outside dropdown

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50); // Trigger sticky when scrolled 50px down
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener
    };
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent event from propagating to document
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <nav className={`nav colored-nav ${sticky ? 'sticky-nav' : ''}`}>
      <img src={R} alt="logo" className="logo" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutUs">About Us</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
      </ul>
      <div className="flex items-center">
        {token ? (
          <div className="profile-menu-container" onClick={handleDropdownClick}>
            <img className="profile-pic" src={profile_pic} alt="Profile" />
            <img className="dropdown-icon" src={dropdown_icon} alt="Dropdown Icon" />
            {dropdownVisible && (
              <div ref={dropdownRef} className="dropdown-menu">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={() => navigate('/profile')}>My Profile</p>
                  <p onClick={() => navigate('/appointments')}>Appointments</p>
                  <p onClick={() => setToken(false)}>Logout</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
