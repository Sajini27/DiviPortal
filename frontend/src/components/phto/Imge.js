import React from 'react';
import './imge.css';
import b3 from '../../assets/b3.JPG';
import b2 from '../../assets/b2.jpg';
import b4 from '../../assets/b4.jpg';

function imge() {

    return(
      <div className='imge  '>
        <div className='ph'>
            <img src={b2} alt=""></img>
        </div>
        <div className='ph'>
            <img src={b3} alt=""></img>
        </div>
        <div className='ph'>
            <img src={b4} alt=""></img>
        </div>
      </div>
    );
}

export default imge;