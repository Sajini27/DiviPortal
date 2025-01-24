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
                            hgyetyd
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
                            fuyrf
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
                            dgvh
                        </p>
                    </div>
                    </div>

            </div>
            
        </div>
    );
}

export default Birth;