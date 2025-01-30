import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pension.css';

function Pension() {
    const navigate = useNavigate();

    // Function to handle service click
    const handleServiceClick = (path) => {
        navigate(path);
    };

    // List of services
    const services = [
        {
            title: 'Pension for Widows',
            description: 'Financial assistance for widows to support their livelihoods after the loss of a spouse. This program ensures access to essential resources and stability.',
            path: '/pension_for_windows',
        },
        {
            title: 'Pension for Orphans',
            description: 'Financial support for children who have lost their parents, ensuring access to education, healthcare, and basic necessities.',
            path: '/pension_for_orphans',
        },
    ];

    return (
        <div className="pension-container">
            {/* Description section */}
            <div className="page-description">
                <h2>Payment of Pensions</h2>
                <p>
                    Our pension programs provide financial support to widows and orphans, ensuring they have the resources needed to maintain their livelihoods. These initiatives offer regular payments, healthcare benefits, and educational support, helping families rebuild their lives after the loss of a loved one.
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

export default Pension;