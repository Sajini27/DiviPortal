import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import civil from '../../assets/civil.jpg';
import insurance from '../../assets/insurance.jpg';
import pension from '../../assets/pension.jpg';
import certificate from '../../assets/certificate.png';
import land from '../../assets/land.jpg';

function Services() {
    const navigate = useNavigate();

    // Function to handle image click
    const handleImageClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            {/* Top description section */}
            <div className='services-description'>
                <h2>Our Services</h2>
                <p>Explore our range of services designed to cater to your civil, insurance, pension, certificate, and land administration needs. Click on any section below to learn more.</p>
            </div>

            {/* Services grid */}
            <div className='imge'>
                <div className='ph' onClick={() => handleImageClick('/civil')}>
                    <img src={civil} alt="Civil" />
                    <p className='description'>Civil Registration</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/permits')}>
                    <img src={insurance} alt="Issuance" />
                    <p className='description'>Issuance of Permits</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/pension')}>
                    <img src={pension} alt="Pension" />
                    <p className='description'>Payment of Pension</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/certificate')}>
                    <img src={certificate} alt="Certificate" />
                    <p className='description'>Issuing Certificate</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/land')}>
                    <img src={land} alt="Land" />
                    <p className='description'>Land Administration</p>
                </div>
            </div>
        </div>
    );
}

export default Services;