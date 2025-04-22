import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sidebar.css';
import { AppContext } from "../../../context/appContext";

const Sidebar = () => {
  const [division, setDivision] = useState(null);
  const [error] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  // Fetch the user profile to get the division
  const fetchUserProfile = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDivision(res.data.division);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const navigationLinks = {
    "Samurdhi Programme": [
      { name: "Samurdhi Programme Page", path: "/samurdhiProgramme" },
    ],
    "Civil Registration": [
      { name: "Civil Registration Page", path: "/civilRegistration" },
    ],
    "Issuance of Permits": [
      { name: "Issuance of Permits Page", path: "/issuanceOfPermits" },
    ],
    "Payment of Pension": [
      { name: "Payment of Pension Page", path: "/paymentOfPension" },
    ],
    "Issuing Certificate": [
      { name: "Issuing Certificate Page", path: "/issuingCertificate" },
    ],
  };

  const renderSidebarLinks = () => {
    if (division && navigationLinks[division]) {
      return (
        <ul className="sidebar-links">
          {navigationLinks[division].map((link, index) => (
            <li key={index} onClick={() => navigate(link.path)}>
              {link.name}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  // Determine if division is one of the staff divisions
  const isStaffDivision = [
    "Civil Registration",
    "Samurdhi Programme",
    "Issuance of Permits",
    "Payment of Pension",
    "Issuing Certificate"
  ].includes(division);

  const sidebarTitle = isStaffDivision ? "Staff Dashboard" : `${division} Dashboard`;

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">{division ? sidebarTitle : "Dashboard"}</h2>
      {error && <p className="error-message">{error}</p>}
      {renderSidebarLinks()}
    </div>
  );
};

export default Sidebar;
