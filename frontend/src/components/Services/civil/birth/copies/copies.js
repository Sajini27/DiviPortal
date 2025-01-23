import React from 'react';
import './copies.css';

function Copies() {
  return (
    <div className="delayed">
      <h1>Copies of Birth Certificate</h1>
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
            href="https://docs.google.com/forms/d/e/1FAIpQLSenwqQyQbgbyBIKI5ifvVp7mBlS4JIsGMc60M4_9MMqb6Wa3w/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Copies;