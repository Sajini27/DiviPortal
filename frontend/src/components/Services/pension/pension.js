import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pension.css';
import orphans from '../../../assets/orphans.jpg';
import window from '../../../assets/window.jpg';

function Pension() {
    const navigate = useNavigate();

    const handleImageClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            {/* Description section */}
            <div className='page-description'>
                <h2>Payment of pensions</h2>
                <p><b>Pension for Windows and Orphans</b> is a financial support system designed to provide assistance to the families of deceased individuals, primarily focusing on widows and orphans. This pension scheme aims to ensure that surviving family members have a steady income to maintain their livelihoods after losing their primary breadwinner. The initiative often includes regular monetary payments, healthcare benefits, and educational support for children, thereby helping to alleviate the economic burden and promote stability in their lives. 
                    This type of pension system plays a crucial role in social welfare, providing security and support during vulnerable times.</p>
            </div>
            
            
            {/* Services grid */}
            <div className='imge'>
                <div className='ph' onClick={() => handleImageClick('/pension_for_windows')}>
                    <img src={window} alt="window" />
                    <p className='description'>Pension for Windows</p>
                </div>
                <div className='ph' onClick={() => handleImageClick('/pension_for_orphans')}>
                    <img src={orphans} alt="orphans" />
                    <p className='description'>Pension for Orphans</p>
                </div>
                
            </div>
        </div>
    );
}

export default Pension;
