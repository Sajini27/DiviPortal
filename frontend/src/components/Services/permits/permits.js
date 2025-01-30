import React from 'react';
import { useNavigate } from 'react-router-dom';
import './permits.css';

function Permits() {
    const navigate = useNavigate();

    // Function to handle service click
    const handleServiceClick = (path) => {
        navigate(path);
    };

    // List of services
    const services = [
        {
            title: 'Permits for Felling Trees',
            description: 'Obtain permits for felling trees to ensure compliance with environmental regulations. This permit is essential for individuals or organizations involved in logging, construction, or land development projects. Click to learn more about the application process and requirements.',
            path: '/permit_for_felling_tree',
        },
        {
            title: 'Permits for Soil Transport',
            description: 'Secure permits for transporting soil to ensure proper land use and environmental protection. This permit is required for construction, landscaping, or agricultural projects involving the movement of soil. Click to explore the application process and guidelines.',
            path: '/permit_for_soil_transport',
        },
        {
            title: 'Permits for Timber Transportation',
            description: 'Acquire permits for transporting timber to comply with forestry and environmental laws. This permit is necessary for businesses involved in the timber industry, ensuring sustainable practices and legal compliance. Click to find out more about the application process.',
            path: '/permit_for_timber_transport',
        },
        {
            title: 'Permits for Transportation of Animals',
            description: 'Get permits for transporting animals to ensure their welfare and compliance with animal protection laws. This permit is required for businesses or individuals involved in the movement of livestock, pets, or wildlife. Click to learn more about the application process and regulations.',
            path: '/permit_for_animal_transport',
        },
    ];

    return (
        <div className="permits-container">
            {/* Description section */}
            <div className="page-description">
                <h2>Issuance Permits</h2>
                <p>
                    We provide official permits for various activities, including felling trees, transporting soil, timber, and animals. Our streamlined process ensures you get the permits you need quickly and efficiently, while complying with all relevant regulations.
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

export default Permits;