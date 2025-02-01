import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import dropdown_icon from '../../assets/dropdown_icon.svg';
import './Navbar.css';

function Navbar() {
    const { token, userName, role, logout } = useContext(AppContext); // Use `role` from context
    const [sticky, setSticky] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Handle scroll to make navbar sticky
    const handleScroll = () => {
        setSticky(window.scrollY > 50);
    };

    // Toggle dropdown visibility
    const handleDropdownClick = (e) => {
        e.stopPropagation(); // Prevent event from closing immediately
        setDropdownVisible((prev) => !prev);
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Add scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Get the first letter of the user's name
    const firstLetter = userName ? userName[0].toUpperCase() : '';

    // Determine if the user is an admin, officer, or staff
    const isAdmin = role === 'admin';
    const isOfficer = role === 'officer';
    const isStaff = role === 'staff';

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
                {/* Conditionally render Dashboard link */}
                {(isAdmin || isOfficer || isStaff) && (
                    <li>
                        <Link to={isAdmin ? '/admin-dashboard' : isOfficer ? '/officer-dashboard' : '/staff-dashboard'}>
                            Dashboard
                        </Link>
                    </li>
                )}
            </ul>
            <div className="flex items-center">
                {token ? (
                    <div className="profile-menu-container" onClick={handleDropdownClick}>
                        <div className="nav-profile-letter">{firstLetter}</div>
                        <img className="dropdown-icon" src={dropdown_icon} alt="Dropdown Icon" />
                        {dropdownVisible && (
                            <div ref={dropdownRef} className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                                <div className="dropdown-content">
                                    <p onClick={() => navigate('/profile')}>My Profile</p>
                                    <p onClick={() => navigate('/appointments')}>Appointments</p>
                                    <p onClick={handleLogout}>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button 
                        onClick={() => navigate('/login')}
                        className="create-account-button"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;