import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

function Services() {
    const navigate = useNavigate();

    // Function to handle service click
    const handleServiceClick = (path) => {
        navigate(path);
    };

    // List of services
    const services = [
        {
            title: 'Civil Registration',
            description: 'Manage and access civil registration services, including birth, marriage, and death certificates.',
            path: '/civil',
        },
        {
            title: 'Issuance of Permits',
            description: 'Simplify the process of obtaining permits for various activities.',
            path: '/permits',
        },
        {
            title: 'Payment of Pension',
            description: 'Secure pension services for retirees with ease and reliability.',
            path: '/pension',
        },
        {
            title: 'Issuing Certificate',
            description: 'Request and manage official certificates for various needs.',
            path: '/certificate',
        },
        {
            title: 'Land Administration',
            description: 'Access services related to land registration and administration.',
            path: '/land',
        },
        {
            title: 'Booking Appointment',
            description: 'Book appointments for various services with ease and convenience.',
            path: '/appoinment',
        },
    ];

    return (
        <div className="services-container">
            {/* Top description section */}
            <div className="services-description">
                <h2>Our Services</h2>
                <p>
                    Explore our range of services designed to cater to your civil, insurance, pension, certificate, and land administration needs.
                    Click on any service below to learn more.
                </p>
            </div>

            {/* Services list */}
            <div className="services-list">
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

export default Services;