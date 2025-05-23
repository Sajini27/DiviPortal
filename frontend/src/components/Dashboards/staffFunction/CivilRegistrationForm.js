import Sidebar from "./sideBar";
import { useNavigate } from "react-router-dom";
import './CivilRegistrationForm.css'

const CivilRegistration = () => {
  const navigate = useNavigate();

  // Define navigation links for the topics
  const topics = [
    { name: "Birth Certificate", path: "/civilRegistration/birthCertificate" },
    { name: "Name Change", path: "/civilRegistration/nameChange" },
    { name: "Copies of Marriage Certificate", path: "/civilRegistration/marriageCertificateCopies" },
    { name: "Copies of Death Certificate", path: "/civilRegistration/deathCertificateCopies" },
  ];

  return (
    <div className="staff-dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Civil Registration Area</h1>

        <ul className="topic-links">
          {topics.map((topic, index) => (
            <li key={index} onClick={() => navigate(topic.path)} className="topic-link">
              {topic.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CivilRegistration;
