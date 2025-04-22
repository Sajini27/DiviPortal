import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/login');
    };

    return (
        <div className='hero'>
            <div className='hero-image'></div>

            <div className='hero-content'>
                <div className='hero-text'>
                    <h1>Welcome to DiviPortal</h1>
                    <p>
                        DiviPortal is your one-stop solution for accessing the services of the Divisional Secretariat Office with ease and convenience.
                    </p>
                    <button className='cta-button' onClick={handleExploreClick}>
                        Explore Services
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
