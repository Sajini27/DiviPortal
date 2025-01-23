import React from 'react';
import './namechange.css';

function NameChange() {
  return (
    <div className="amendment">
      <h1>Name Change Application</h1>
      <div>
        <h3>Eligibility</h3>
        <p>Information about mother, father, date of birth, place of birth, information about grandfather 
        They applied for villages called Gavanas rather than the available information.</p>
        <h3>Required Supporting Documents</h3>
        <ul>
          <li>Birth certificate required to be amended</li>
          <li>Residence Proof Letter from Village Officials</li>
          <li>Application</li>
        </ul>
      </div>
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
        <p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSe71oQ4CAKWScqeqiJEaHQT1utJL2P66JYBKxr44I4EMxMqAQ/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default NameChange;