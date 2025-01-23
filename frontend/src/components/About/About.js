import React from 'react';
import './About.css';

function About({subabout, about}) {

    return(
      <div className='about'>
        <h1>{subabout}</h1>

        <p>{about}</p>
        
      </div>
    );
}

export default About;