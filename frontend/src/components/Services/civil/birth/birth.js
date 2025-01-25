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
        <div>
            {/* Description section */}
            <div className='page-description'>
                <h2>Birth Certificate</h2>
                <p>Manage all your birth certificate needs in one place. Whether you require Copies of Birth Certificates, assistance with Delayed Birth Registration, or submitting a Birth Certificate Amendment Application, we’ve got you covered. Our streamlined process ensures you get the services you need quickly and efficiently.</p>
            </div>

            <div className='container'>           
                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/amendment')}>
                        <img src={amendment} alt="Amendment" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='description'>Birth Certificate Amendment Application</h4>
                        <p>
                        A birth certificate amendment is a formal process used to correct or update information on an individual's birth certificate. This could include changes to the name, date of birth, parental information, or other personal details that were recorded inaccurately or need modification. 
                        The amendment typically involves submitting a request to the relevant government authority, providing supporting documents. Amending a birth certificate is essential for ensuring accurate personal records, which are often required for official purposes such as obtaining identification documents, enrolling in school, or applying for employment.
                        <b>Click on the image </b>to get more information.
                        </p>
                     </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/delayed')}>
                        <img src={delayed} alt="Delayed" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='description'>Delayed Birth Registration</h4>
                        <p>
                        Delayed birth registration is the process of officially registering a birth with the relevant government authority after the standard registration period has passed. 
                        This process is often necessary for individuals whose births were not recorded at the time of birth due to various reasons such as lack of awareness, geographical limitations, or administrative errors.
                        <b>Click on the image </b>to get more information.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/copies')}>
                        <img src={Copies} alt="Copies" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='description'>Copies of Birth Certificate</h4>
                        <p>
                        Obtaining copies of a birth certificate is essential for various legal, educational, and personal purposes, such as applying for a passport, enrolling in school, or verifying identity.
                        Ensure that the information provided is accurate to avoid delays in receiving the copies. <b>Click on the image </b>to get more information.
                        </p>
                    </div>
                    </div>

            </div>
            
        </div>
    );
}

export default Birth;