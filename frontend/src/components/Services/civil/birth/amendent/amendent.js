import React from 'react';
import './amendent.css';

function Amendment() {
  return (
    <div className="amendment">
      <h1>Birth Certificate Amendment Application</h1>
      <p>Details about the amendment process for Father, Grandfather, and Informant.</p>
      <div>
        <h3>Eligibility</h3>
        <p>Information about mother, father, date of birth, place of birth, information about grandfather. 
        They applied for villages called Gavanas rather than the available information.</p>
        
        <h3>Required Supporting Documents</h3>
        <ul>
          <li>Birth certificate required to be amended</li>
          <li>Marriage Certificate of Parents</li>
          <li>Photocopies of National Identity Cards of parents</li>
          <li>Residence Proof Letter from Village Officer</li>
          <li>Affidavit if there are differences in the names of the parents</li>
          <li>Other required documents</li>
        </ul>
      </div>
      
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
        <p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScL7ZhTcyP1c3BKMENi6QgInA-joM3iOM1zuAOIcW8WDU0JTA/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Amendment;
