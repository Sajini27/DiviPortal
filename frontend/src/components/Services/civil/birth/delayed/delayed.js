import React from 'react';
import './delayed.css';

function Delayed() {
  return (
    <div className="delayed">
      <h1>Delayed Birth Registration</h1>
      <div>
      <h3>Required Supporting Documents</h3>
        <ul>
          <li>Hospital report.</li>
          <li>Village Officer report.</li>
          <li>Health growing report</li>
        </ul>
      </div>
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
        <p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeFvUaEdbfCuzmDNG6etd8rGT0VYVrAmqqYi70E0vKzOUNV8A/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Delayed;