import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import civil from '../../assets/civil.jpg';
import insurance from '../../assets/insurance.jpg';
import pension from '../../assets/pension.jpg';
import certificate from '../../assets/certificate.png';
import land from '../../assets/land.jpg';
import appoin from '../../assets/appoin.webp';

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
                <p>
                    Explore our range of services designed to cater to your civil, insurance, pension, certificate, and land administration needs.
                    Click on any section below to learn more.
                </p>
            </div>

            {/* Services list */}
            <div className="container">
                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/civil')}>
                        <img src={civil} alt="Civil" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4>Civil Registration</h4>
                        <p>
                            Manage and access civil registration services, including birth, marriage, and death certificates. Click image to explore more.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/permits')}>
                        <img src={insurance} alt="Issuance" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4>Issuance of Permits</h4>
                        <p>
                            Simplify the process of obtaining permits for various activities. Click image to view detailed information.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/pension')}>
                        <img src={pension} alt="Pension" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4>Payment of Pension</h4>
                        <p>
                            Secure pension services for retirees with ease and reliability. Click image to explore the pension payment process.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/certificate')}>
                        <img src={certificate} alt="Certificate" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4>Issuing Certificate</h4>
                        <p>
                            Request and manage official certificates for various needs. Click to image for learn more about our services.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/land')}>
                        <img src={land} alt="Land" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4>Land Administration</h4>
                        <p>
                            Access services related to land registration and administration. Click to the image find out more details.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/appoinment')}>
                        <img src={appoin} alt="appoinment" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4>Booking Appoinment</h4>
                        <p>
                            Access services related to land registration and administration. Click to the image find out more details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
