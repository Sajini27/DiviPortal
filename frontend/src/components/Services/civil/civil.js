import React from 'react';
import { useNavigate } from 'react-router-dom';
import './civil.css';
import birth from '../../../assets/birth.jpg';
import death from '../../../assets/death.jpg';
import marriage from '../../../assets/marriage.jpg';
import namechange from '../../../assets/namechange.jpg';

function Services() {
    const navigate = useNavigate();

    const handleImageClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            {/* Description section */}
            <div className='page-description'>
                <h2>Civil Registration</h2>
                <p>Civil Registration is the process of documenting important life events, such as births, deaths, marriages, and name changes. We provide official records and certificates to support your legal and administrative needs with accuracy and efficiency.</p>
            </div>
            
            
            {/* Services grid */}
            <div className='container'>
                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/birth')}>
                        <img src={birth} alt="Birth" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='description'>Birth Certificate</h4>
                        <p>
                        Manage all your birth certificate needs in one place. Whether you require Copies of Birth Certificates, assistance with Delayed Birth Registration, or submitting a Birth Certificate Amendment Application, we’ve got you covered. Our streamlined process ensures you get the services you need quickly and efficiently.
                        Click on the image to explore more details about these services and how we can assist you.
                        </p>
                    </div>
                </div>
                
                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/namechange')}>
                        <img src={namechange} alt="Name Change" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='description'>Name Change</h4>
                        <p>
                        Easily manage the process of changing your name with our comprehensive services. Whether it's updating legal documents, correcting errors, or officially adopting a new name, we are here to simplify the process for you. Get step-by-step guidance and support to ensure a smooth and hassle-free experience.
                        Click on the image to learn more about the name change application process and requirements.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/marriage')}>
                        <img src={marriage} alt="Marriage" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='description'>Copies of Marriage Certificate</h4>
                        <p>
                        Obtain certified copies of your marriage certificate quickly and easily through our services. Whether you need additional copies for official purposes, legal documentation, or personal records, we ensure a hassle-free application process.
                        Click on the image to explore more details about the application process, required documents, and how to request your copy today.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-md-4" onClick={() => handleImageClick('/death')}>
                        <img src={death} alt="Death" className="img-fluid custom-img" />
                    </div>
                    <div className="col-md-8">
                        <h4 className='description'>Copies of Death Certificate</h4>
                        <p>
                        A death certificate confirms the death of an individual. Copies are needed for legal and financial purposes. Click on the image to explore more details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
