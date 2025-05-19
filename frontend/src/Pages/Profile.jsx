import React from "react";
import "./Profile.css";

const Profile = () => {
  // Get the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div style={{ padding: "2rem" }}>No user logged in.</div>;
  }

  // Example: Add registration date and profile picture placeholder
  // If you want to store registration date, you should add it during registration
  // For now, we'll use a placeholder if not present
  const registrationDate = user.registrationDate || "N/A";
  const profilePic =
    user.profilePic ||
    "https://ui-avatars.com/api/?name=" + (user.username || user.email);

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        <img src={profilePic} alt="Profile" className="profile-image" />
        <div className="profile-username">{user.username || "N/A"}</div>
        <div className="profile-email">{user.email}</div>
      </div>
      <div className="profile-detail">
        <strong>Registration Date:</strong> {registrationDate}
      </div>
      {/* Add more fields as needed */}
      {/* <div className="profile-detail"><strong>Phone:</strong> {user.phone || "N/A"}</div> */}
      {/* <div className="profile-detail"><strong>Role:</strong> {user.role || "User"}</div> */}
    </div>
  );
};

export default Profile;
