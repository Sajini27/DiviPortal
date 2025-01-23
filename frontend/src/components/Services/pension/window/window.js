import React from 'react';
import './window.css';

function Window() {
  return (
    <div className="delayed">
      <h1>Pension for Windows</h1>
      <div>
      <h3>Required Supporting Documents</h3>
        <ul>
          <li>Original copy of the death certificate of the pensioner.</li>
          <li>Original Copy of Marriage Certificate.</li>
          <li>Original copy of widow's birth certificate.</li>
          <li>Copy of Widow's Identity Card (attested by Grama Sevaka).</li>
          <li>Copy of bank book prepared in the name of widow (attested by Grama Sevaka).</li> 
          <li>Original copy of birth certificate of pensioner.</li>
          <li>Copy of Widow's Orphan Card (Attested by Grama Sevaka).</li>
          <li>An affidavit if there are differences in names.</li>
          <li>Attested copies of Gram Sevaka's report and their birth certificates if there are dependent children.</li>
          <li>Gram Sevaka attested passport size color photograph</li>
        </ul>
      </div>
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
        <p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeWp4Ogxc622XQmtA3ait8jEt9fMG8VeA15elkAcmNWQ9HMdA/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Window;