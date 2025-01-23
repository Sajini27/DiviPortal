import React from 'react';
import { useNavigate } from 'react-router-dom';
import './permits.css';
import fellingtree from '../../../assets/fellingtree.jpg';
import timber from '../../../assets/timber.jpg';
import soil from '../../../assets/soil.jpeg';
import animal from '../../../assets/animal.jpg';

function Permits() {
    const navigate = useNavigate();

    const handleImageClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            {/* Description section */}
            <div className='page-description'>
                <h2>Issuance Permits</h2>
                <p>Civil Registration is the process of documenting important life events, such as births, deaths, marriages, and name changes. We provide official records and certificates to support your legal and administrative needs with accuracy and efficiency.</p>
            </div>
            
            
            {/* Services grid */}
            <div className='imge'>
                <div className='ph' onClick={() => handleImageClick('/permit_for_felling_tree')}>
                    <img src={fellingtree} alt="fellinngtree" />
                    <p className='description'>Permit for Felling Trees</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/permit_for_soil_transport')}>
                    <img src={soil} alt="soilTransport" />
                    <p className='description'>Permit For Soil Transport</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/permit_for_timber_transport')}>
                    <img src={timber} alt="timberTransport" />
                    <p className='description'>Permit for Timber Transport</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/permit_for_animal_transport')}>
                    <img src={animal} alt="animalTransport" />
                    <p className='description'>Permit for Animal Transport</p>
                </div>
            </div>
        </div>
    );
}

export default Permits;
