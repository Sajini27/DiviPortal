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
            <div className='imge'>
                <div className='ph' onClick={() => handleImageClick('/birth')}>
                    <img src={birth} alt="Birth" />
                    <p className='description'>Birth Certificate</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/namechange')}>
                    <img src={namechange} alt="Name Change" />
                    <p className='description'>Name Change</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/marriage')}>
                    <img src={marriage} alt="Marriage" />
                    <p className='description'>Copies of Marriage Certificate</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/death')}>
                    <img src={death} alt="Death" />
                    <p className='description'>Copies of Death Certificate</p>
                </div>
            </div>
        </div>
    );
}

export default Services;
