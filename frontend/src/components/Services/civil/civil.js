import React from 'react';
import { useNavigate } from 'react-router-dom';
import './civil.css';

function Services() {
    const navigate = useNavigate();

    
    const handleServiceClick = (path) => {
        navigate(path);
    };

    
    const services = [
        {
            title: 'Birth Certificate',
            description: 'Manage all your birth certificate needs in one place. Whether you require Copies of Birth Certificates, assistance with Delayed Birth Registration, or submitting a Birth Certificate Amendment Application, we’ve got you covered. Our streamlined process ensures you get the services you need quickly and efficiently.',
            path: '/birth',
        },
        {
            title: 'Name Change',
            description: 'Easily manage the process of changing your name with our comprehensive services. Whether it\'s updating legal documents, correcting errors, or officially adopting a new name, we are here to simplify the process for you. Get step-by-step guidance and support to ensure a smooth and hassle-free experience.',
            path: '/namechange',
        },
        {
            title: 'Copies of Marriage Certificate',
            description: 'Obtain certified copies of your marriage certificate quickly and easily through our services. Whether you need additional copies for official purposes, legal documentation, or personal records, we ensure a hassle-free application process.',
            path: '/marriage',
        },
        {
            title: 'Copies of Death Certificate',
            description: 'A death certificate confirms the death of an individual. Copies are needed for legal and financial purposes. Click on the image to explore more details.',
            path: '/death',
        },
    ];

    return (
        <div className="civil-container">
            {/* Description section */}
            <div className="page-description">
                <h2>Civil Registration</h2>
                <p>
                    Civil Registration is the process of documenting important life events, such as births, deaths, marriages, and name changes. We provide official records and certificates to support your legal and administrative needs with accuracy and efficiency.
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

export default Services;