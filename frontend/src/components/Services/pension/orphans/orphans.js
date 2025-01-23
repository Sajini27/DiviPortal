import React from 'react';
import './orphans.css';

function Orphans() {
  return (
    <div className="delayed">
      <h1>Pension for Orphans</h1>
      <div>
      <h3>Required Supporting Documents</h3>
        <ul>
          <li>Original copy of the death certificate of the pensioner.</li>
          <li>Original Copy of Marriage Certificate of the pensioner.</li>
          <li>Original copy of orphan's birth certificate.</li>
          <li>Copy of guardient's Identity Card (attested by Grama Sevaka).</li>
          <li>Copy of bank book prepared in the name of guardient (attested by Grama Sevaka).</li> 
          <li>Original copy of birth certificate of pensioner.</li>
          <li>An affidavit if there are differences in names.</li>
          <li>Attested copies of Gram Sevaka's report.</li>
          <li>Gram Sevaka attested passport size color photograph</li>
        </ul>
      </div>
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
        <p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScnEgDBqXs_MwL-X__b-oZbdmp5Y8H_mRbfEZIjRfZqIbYHqA/viewform?usp=sf_link" 
            target="_blank" 
            rel="noopener noreferrer">
            <u>Click here to access the form</u>
          </a>
        </p>
      </div>
      
    </div>
  );
}

export default Orphans;