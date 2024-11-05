// frontend/src/pages/ProfileManagement/ProfileManagement.jsx
import React, { useEffect, useState } from "react";
import "./ProfileManagement.css";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/default-avatar.png"; 

const ProfileManagement = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <div>No user data available.</div>; 
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; 
  };

  const handleEditProfile = () => {
    window.location.href = "/edit-profile"; 
  };

  return (
    <div className="profile-management">
      <h1>User Profile</h1>
      <div className="profile-details">
        <ul className="profile-info">
          <li><strong>Name:</strong><hr /> {user.name}</li>
          <li><strong>Email:</strong><hr /> {user.email}</li>
          <li><strong>Username:</strong><hr /> {user.username}</li>
          <li><strong>Phone:</strong><hr /> {user.phone}</li>
          <li><strong>Address:</strong><hr /> {user.address}</li>
          <li><strong>City:</strong><hr /> {user.city}</li>
          <li><strong>Country:</strong><hr /> {user.country}</li>
          <li><strong>Join Date:</strong><hr /> {user.joinDate}</li>
          <li><strong>Account Type:</strong><hr /> {user.accountType}</li>
          <li><strong>Subscription:</strong><hr /> {user.subscription}</li>
        </ul>
        <div className="action-buttons">
          <button onClick={handleEditProfile} className="edit-button">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <Link to="/" className="home-button">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
