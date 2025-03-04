import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/appContext";
import './Myprofile.css';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    division: "",
    department: ""
  });

  const [originalUserData, setOriginalUserData] = useState({});
  const [isEdit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const { token, role } = useContext(AppContext);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setOriginalUserData(parsedData);
    }

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        setOriginalUserData(res.data);
        localStorage.setItem("userData", JSON.stringify(res.data));
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch profile data. Please try again.");
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    const isUser = role === "user";
    const isStaff = role === "staff";

    if (
      !userData.name ||
      !userData.phone ||
      !userData.address ||
      (isUser && !userData.division) ||
      (isStaff && !userData.department)
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.put("http://localhost:5000/api/user/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEdit(false);
      setError("");
      setOriginalUserData(res.data);
      localStorage.setItem("userData", JSON.stringify(res.data));
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setUserData(originalUserData);
    setEdit(false);
  };

  const firstLetter = userData.name ? userData.name[0].toUpperCase() : '';

  return (
    <div className="my-profile-container">
      <h2>My Profile</h2>
      <div className="my-profile-image-container">
        <div className="profile-letter">{firstLetter}</div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {isEdit ? (
        <div className="edit-panel">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </div>
          {role === "user" && (
            <div className="input-group">
              <label>Grama Sewa Division</label>
              <input
                type="text"
                name="division"
                value={userData.division}
                onChange={handleInputChange}
                placeholder="Enter your division"
              />
            </div>
          )}
          {role === "staff" && (
            <div className="input-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={userData.department}
                onChange={handleInputChange}
                placeholder="Enter your department"
              />
            </div>
          )}
          <button onClick={handleUpdate} className="save-button">Save</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <>
          <div className="profile-details">
            <p><strong>Name:</strong> {userData.name || "Not provided"}</p>
            <p><strong>Email:</strong> {userData.email || "Not provided"}</p>
            <p><strong>Phone:</strong> {userData.phone || "Empty"}</p>
            <p><strong>Address:</strong> {userData.address || "Empty"}</p>
            {role === "user" && (
              <p><strong>Grama Sewa Division:</strong> {userData.division || "Empty"}</p>
            )}
            {role === "staff" && (
              <p><strong>Department:</strong> {userData.department || "Empty"}</p>
            )}
          </div>
          <button onClick={() => setEdit(true)} className="edit-button">Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default MyProfile;