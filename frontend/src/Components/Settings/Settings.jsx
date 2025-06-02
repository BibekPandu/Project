import React, { useState, useEffect, useRef } from "react";
import "./Settings.css";
import {
  FaUser,
  FaLock,
  FaPhone,
  FaGoogle,
  FaFacebook,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const Settings = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    phoneNumber: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});
  const settingsRef = useRef(null);

  useEffect(() => {
    // Load user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setFormData((prev) => ({
      ...prev,
      name: userData.name || "",
      phoneNumber: userData.phoneNumber || "",
    }));

    // Handle click outside
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === "profile") {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (formData.newPassword && formData.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Invalid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save data to localStorage
      const userData = {
        ...JSON.parse(localStorage.getItem("userData") || "{}"),
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        profilePicture: formData.profilePicture,
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      // Show success message
      alert("Settings updated successfully!");
      onClose();
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Clear user data
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  return (
    <div className="settings-overlay">
      <div className="settings-container" ref={settingsRef}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="settings-header">
          <h2>Settings</h2>
        </div>

        <div className="settings-tabs">
          <button
            className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </button>
          <button
            className={`tab-button ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            Account Settings
          </button>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          {activeTab === "profile" && (
            <div className="profile-settings">
              <div className="profile-picture-section">
                <div className="profile-picture">
                  <img
                    src={
                      formData.profilePicture ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                  />
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="profile-picture-input"
                  />
                  <label htmlFor="profile-picture" className="upload-button">
                    Change Picture
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <FaUser /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaLock /> Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLock /> New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaLock /> Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="account-settings">
              <div className="linked-accounts">
                <h3>Linked Accounts</h3>
                <div className="account-options">
                  <button className="link-account-button">
                    <FaGoogle /> Link Google Account
                  </button>
                  <button className="link-account-button">
                    <FaFacebook /> Link Facebook Account
                  </button>
                </div>
              </div>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <button
                  type="button"
                  className="delete-account-button"
                  onClick={handleDeleteAccount}
                >
                  <FaTrash /> Delete Account
                </button>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
