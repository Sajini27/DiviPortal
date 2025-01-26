import React, { useState } from "react";
import "./Myprofile.css"; // Import CSS for styling
import profilePic from "../../assets/profile_pic.png"; // Correct image path

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Perera",
    image: profilePic,
    email: "perera@gmail.com",
    phone: "0768596358",
    address: {
      line1: "40, Malpara Road",
      line2: "Pabahinne",
    },
    division: "Pabahinne",
  });

  const [isEdit, setEdit] = useState(false);

  return (
    <div className="profile-container">
      <img className="profile-image" src={userData.image} alt="Profile" />

      <div className="profile-section">
        {isEdit ? (
          <input
            className="profile-input name-input"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="profile-name">{userData.name}</p>
        )}
      </div>

      <hr className="profile-divider" />

      <div className="contact-info">
        <p className="section-title">Contact Information</p>
        <div className="contact-grid">
          <p>Email:</p>
          <p className="highlighted-text">{userData.email}</p>

          <p>Phone:</p>
          {isEdit ? (
            <input
              className="profile-input"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="highlighted-text">{userData.phone}</p>
          )}

          <p>Address:</p>
          {isEdit ? (
            <div>
              <input
                className="profile-input"
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="profile-input"
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}

          <p>Grama Sewa Division:</p>
          {isEdit ? (
            <input
              className="profile-input"
              type="text"
              value={userData.division}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, division: e.target.value }))
              }
            />
          ) : (
            <p className="highlighted-text">{userData.division}</p>
          )}
        </div>
      </div>

      <div className="button-container">
        {isEdit ? (
          <button
            className="profile-button save-button"
            onClick={() => setEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="profile-button edit-button"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
