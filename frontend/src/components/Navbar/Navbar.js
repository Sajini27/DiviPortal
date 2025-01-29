import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AppContext } from '../../context/appContext';
import dropdown_icon from '../../assets/dropdown_icon.svg';

function Navbar() {
    const { token, userName, logout } = useContext(AppContext); // Access token and userName from context
    const [sticky, setSticky] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleScroll = () => {
        setSticky(window.scrollY > 50); // Trigger sticky when scrolled 50px down
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation(); // Prevent event from propagating to document
        setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };

    const handleLogout = () => {
        logout();  // Call the logout function from context
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const firstLetter = userName ? userName[0].toUpperCase() : ''; // Get the first letter of user's name

    return (
        <nav className={`nav ${sticky ? 'sticky-nav' : ''}`}>
            <div className="logo-text">DiviPortal</div>
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
                        <div className="profile-letter">{firstLetter}</div> {/* Show first letter */}
                        <img className="dropdown-icon" src={dropdown_icon} alt="Dropdown Icon" />
                        {dropdownVisible && (
                            <div ref={dropdownRef} className="dropdown-menu">
                                <div className="dropdown-content">
                                    <p onClick={() => navigate('/profile')}>My Profile</p>
                                    <p onClick={() => navigate('/appointments')}>Appointments</p>
                                    <p onClick={handleLogout}>Logout</p> {/* Logout handler */}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="create-account-button"
                    >
                        Create Account
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;