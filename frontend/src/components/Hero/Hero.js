import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <div className='hero'>
            <div className='hero-content'>
                <div className='hero-text'>
                    <h1>Welcome to DiviPortal</h1>
                    <p>
                        DiviPortal is your one-stop solution for accessing the services of the Divisional Secretariat Office with ease and convenience.
                    </p>
                    <button className='cta-button'>Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default Hero;