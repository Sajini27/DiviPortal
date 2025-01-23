import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import R from '../../assets/R.png';

function Navbar() {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          window.scrollY > 50 ? setSticky(true) : setSticky(false); // Trigger sticky when scrolled 50px down
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`nav colored-nav ${sticky ? 'sticky-nav' : ''}`}>
            <img src={R} alt="logo" className="logo" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/aboutUs">About Us</Link></li>
                <li><Link to="/services">Services</Link></li> {/* Ensure this route exists */}
                <li><Link to="/notifications">Notifications</Link></li> {/* Ensure this route exists */}
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

