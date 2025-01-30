import React from 'react';
import { useNavigate } from 'react-router-dom';
import './birth.css';

function Birth() {
    const navigate = useNavigate();

    // Function to handle service click
    const handleServiceClick = (path) => {
        navigate(path);
    };

    // List of services
    const services = [
        {
            title: 'Birth Certificate Amendment Application',
            description: 'A birth certificate amendment is a formal process used to correct or update information on an individual\'s birth certificate. This could include changes to the name, date of birth, parental information, or other personal details that were recorded inaccurately or need modification. The amendment typically involves submitting a request to the relevant government authority, providing supporting documents. Amending a birth certificate is essential for ensuring accurate personal records, which are often required for official purposes such as obtaining identification documents, enrolling in school, or applying for employment.',
            path: '/amendment',
        },
        {
            title: 'Delayed Birth Registration',
            description: 'Delayed birth registration is the process of officially registering a birth with the relevant government authority after the standard registration period has passed. This process is often necessary for individuals whose births were not recorded at the time of birth due to various reasons such as lack of awareness, geographical limitations, or administrative errors.',
            path: '/delayed',
        },
        {
            title: 'Copies of Birth Certificate',
            description: 'Obtaining copies of a birth certificate is essential for various legal, educational, and personal purposes, such as applying for a passport, enrolling in school, or verifying identity. Ensure that the information provided is accurate to avoid delays in receiving the copies.',
            path: '/copies',
        },
    ];

    return (
        <div className="birth-container">
            {/* Description section */}
            <div className="page-description">
                <h2>Birth Certificate</h2>
                <p>
                    Manage all your birth certificate needs in one place. Whether you require Copies of Birth Certificates, assistance with Delayed Birth Registration, or submitting a Birth Certificate Amendment Application, we’ve got you covered. Our streamlined process ensures you get the services you need quickly and efficiently.
                </p>
            </div>

            {/* Services grid */}
            <div className="services-grid">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card"
                        onClick={() => handleServiceClick(service.path)}
                    >
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Birth;