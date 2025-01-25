import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-light border-top py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">
          Copyright © 2025 Divisional Secretariat - Kuruwita. All Rights Reserved.
        </p>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a href="#terms" className="text-decoration-none">
              Terms of Services
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#privacy" className="text-decoration-none">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
