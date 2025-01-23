import React from 'react';
import './land.css';

function Land() {
  return (
    <div className="delayed">
      <h1>Issuance of long-term lease for government land for special sponsored projects</h1>
      <div>
      <h3>Special sponsored projects are,</h3>
      <ul>
          <li>A Cabinet approved project.</li>
          <li>An investment board approved project.</li>
          <li>Ministry of Industry approved project.</li>
          <li>A project with special sponsorship of any other government subsidiary.</li>
        </ul>
      <h3>Required Supporting Documents</h3>
        <ul>
          <li>Requesting application.</li>
          <li>Project report.</li>
          <li>Approval from relevant departments.</li>
        </ul>
      </div>
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
        <p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSfus7m9qDnpSWnbbaF4C00y0ucmx8D9seKkwmW9v1mccOBCug/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Land;