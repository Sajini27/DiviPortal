import React from 'react';
import './marriage.css';

function Marriage() {
  return (
    <div className="delayed">
      <h1>Copies of Marriage Certificate</h1>
      <div>
      <h3>Required Supporting Documents</h3>
        <ul>
          <li>Requesting application.</li>
        </ul>
      </div>
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
        <p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_YK4Rac0VHKr22M0I-7xpzAaFHISzS7L2_Mmp2v53VwXm8w/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Marriage;