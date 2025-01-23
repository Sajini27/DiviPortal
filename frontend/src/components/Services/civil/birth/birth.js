import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './birth.css';
import amendment from '../../../../assets/amendment.jpg';
import delayed from '../../../../assets/delayed.jpg';
import Copies from '../../../../assets/copies.jpg';

function Birth() {
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Function to handle image click
    const handleImageClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div className='imge'>
            <div className='ph' onClick={() => handleImageClick('/amendment')}>
                <img src={amendment} alt="Amendment" />
                <p className='description'>Birth Certificate Amendment Application</p>
            </div>
            <div className='ph' onClick={() => handleImageClick('/delayed')}>
                <img src={delayed} alt="Delayed" />
                <p className='description'>Delayed Birth Registration</p>
            </div>
            <div className='ph' onClick={() => handleImageClick('/copies')}>
                <img src={Copies} alt="Copies" />
                <p className='description'>Copies of Birth Certificate</p>
            </div>

        </div>
    );
}

export default Birth;