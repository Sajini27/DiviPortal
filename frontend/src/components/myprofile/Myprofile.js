import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import './Myprofile.css';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    division: ""
  });

  const [isEdit, setEdit] = useState(false);

  const { token } = useContext(AppContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile...");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/user/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEdit(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const firstLetter = userData.name ? userData.name[0].toUpperCase() : '';

  return (
    <div className="my-profile-container">
      <h2>My Profile</h2>
      <div className="my-profile-image-container">
        <div className="profile-letter">{firstLetter}</div>
      </div>
      {isEdit ? (
        <div className="edit-panel">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="division"
            value={userData.division}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate} className="edit-button">Save</button>
        </div>
      ) : (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {(!userData.phone || userData.phone === '0') ? 'empty' : userData.phone}</p>
          <p>Address: {(!userData.address || userData.address === '') ? 'empty' : userData.address}</p>
          <p>Division: {(!userData.division || userData.division === '') ? 'empty' : userData.division}</p>
          <button onClick={() => setEdit(true)} className="edit-button">Edit</button>
        </>
      )}
    </div>
  );
};

export default MyProfile;
