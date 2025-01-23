import React from 'react';
import './death.css';

function Death() {
  return (
    <div className="delayed">
      <h1>Copies of Death Certificate</h1>
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
            href="https://docs.google.com/forms/d/e/1FAIpQLSc0WBbnN1gRp3ljyGhLoOsscFhoAou4MMmOPC7LRzWNxEbE0w/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Death;