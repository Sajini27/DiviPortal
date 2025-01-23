import React from 'react';
import './timber.css';

function Timber() {
  return (
    <div className="timber">
      <h1>Permits for Timber transportation</h1>
      <p>Details about the permit process for transportation of timber.</p>
      <div>
        <h3>Eligibility</h3>
        <p>Information about mother, father, date of birth, place of birth, information about grandfather 
        They applied for villages called Gavanas rather than the available information.</p>
        <h3>Required Supporting Documents</h3>
        <ul>
          <li>Birth certificate required to be amended</li>
          <li>Marriage Certificate of Parents</li>
          <li>Photocopies of National Identity Cards of parents</li>
          <li>Residence Proof Letter from Village Officials</li>
          <li>Affidavit If there are differences in the names of the parents</li>
          <li>Other required documents</li>
        </ul>
      </div>
      <div>
        <h3>Checking documents for correctness at home before availing services</h3>
      </div>
      
    </div>
  );
}

export default Timber;