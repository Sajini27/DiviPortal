import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import axios from 'axios';
import dropdown_icon from '../../assets/dropdown_icon.svg';
import './Navbar.css';

function Navbar() {
    const { token, userName, role, logout } = useContext(AppContext);
    const [sticky, setSticky] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = () => {
        setSticky(window.scrollY > 50);
    };

    const handleDropdownClick = (e) => {
        e.stopPropagation();
        setDropdownVisible((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            if (!token) return;
            try {
                const res = await axios.get('http://localhost:5000/api/notifications/unreadCount', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUnreadCount(res.data.unreadCount || 0);
            } catch (err) {
                console.error("Error fetching unread count:", err);
            }
        };

        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, [token]);

    const firstLetter = userName ? userName[0].toUpperCase() : '';

    const isAdmin = role === 'admin';
    const isOfficer = role === 'officer';
    const isStaff = role === 'staff';
    const isUser = role === 'user';

    const getLinkClass = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    };

    const renderNotificationLink = () => {
        let path = '';
        if (isUser) path = '/notifications';
        else if (isStaff) path = '/staffNotifications';
        else return null;

        return (
            <li>
                <Link className={getLinkClass(path)} to={path}>
                    Notifications
                    {unreadCount > 0 && (
                        <span className="notification-badge">{unreadCount}</span>
                    )}
                </Link>
            </li>
        );
    };

    return (
        <nav className={`nav ${sticky ? 'sticky-nav' : ''}`}>
            <div className="logo-text">DiviPortal</div>
            <ul>
                <li><Link className={getLinkClass('/')} to="/">Home</Link></li>
                <li><Link className={getLinkClass('/aboutUs')} to="/aboutUs">About Us</Link></li>
                <li><Link className={getLinkClass('/services')} to="/services">Services</Link></li>

                {renderNotificationLink()}

                <li><Link className={getLinkClass('/contact')} to="/contact">Contact Us</Link></li>
                <li><Link className={getLinkClass('/feedback')} to="/feedback">Feedback</Link></li>

                {(isAdmin || isOfficer || isStaff) && (
                    <li>
                        <Link
                            className={getLinkClass(
                                isAdmin ? '/admin-dashboard' :
                                isOfficer ? '/officer-dashboard' :
                                '/staff-dashboard'
                            )}
                            to={
                                isAdmin ? '/admin-dashboard' :
                                isOfficer ? '/officer-dashboard' :
                                '/staff-dashboard'
                            }
                        >
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
