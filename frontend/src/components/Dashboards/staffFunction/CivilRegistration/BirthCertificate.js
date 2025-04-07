import Sidebar from "../sideBar";
import { useNavigate } from "react-router-dom";
import '../CivilRegistrationForm.css'

const BirthCertificate = () => {
  const navigate = useNavigate();

  // Define navigation links for the topics
  const topics = [
    { name: "Amendment", path: "/civilRegistration/birthCertificate/amendment" },
    { name: "Delayed Birth Registration", path: "/civilRegistration/birthCertificate/delayedBirthRegistration" },
    { name: "Copies of Birth Certificate", path: "/civilRegistration/birthCertificate/copiesofBirthCertificate" },
  ];

  return (
    <div className="staff-dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Birth Certificate</h1>

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

export default BirthCertificate;
