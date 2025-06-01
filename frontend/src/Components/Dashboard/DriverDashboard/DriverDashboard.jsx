import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DriverDashboard.css";
import {
  FaTruck,
  FaClipboardList,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
const DriverDashboard = () => {
  const navigate = useNavigate();
  const [driverData, setDriverData] = useState({
    name: "",
    vehicle: null,
    currentTrip: null,
    completedTrips: 0,
    totalDistance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is driver
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "driver") {
      navigate("/login");
      return;
    }

    // Set authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch driver data
    fetchDriverData();
  }, [navigate]);

  const fetchDriverData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/driver/dashboard"
      );
      setDriverData(response.data);
    } catch (error) {
      console.error("Error fetching driver data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const startTrip = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/driver/trips/start"
      );
      if (response.data.success) {
        fetchDriverData(); // Refresh data
      }
    } catch (error) {
      console.error("Error starting trip:", error);
    }
  };

  const endTrip = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/driver/trips/end"
      );
      if (response.data.success) {
        fetchDriverData(); // Refresh data
      }
    } catch (error) {
      console.error("Error ending trip:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="driver-dashboard">
      <nav className="driver-nav">
        <div className="nav-brand">
          <h1>Driver Dashboard</h1>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate("/driver/trips")}>
            <FaClipboardList /> My Trips
          </button>
          <button onClick={() => navigate("/driver/history")}>
            <FaHistory /> Trip History
          </button>
          <button onClick={() => navigate("/driver/settings")}>
            <FaCog /> Settings
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="driver-info">
          <h2>Welcome, {driverData.name}</h2>
          {driverData.vehicle && (
            <div className="vehicle-info">
              <h3>Current Vehicle</h3>
              <p>Model: {driverData.vehicle.model}</p>
              <p>License Plate: {driverData.vehicle.licensePlate}</p>
            </div>
          )}
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Completed Trips</h3>
            <p>{driverData.completedTrips}</p>
          </div>
          <div className="stat-card">
            <h3>Total Distance</h3>
            <p>{driverData.totalDistance} km</p>
          </div>
        </div>

        {driverData.currentTrip ? (
          <div className="current-trip">
            <h2>Current Trip</h2>
            <div className="trip-details">
              <p>From: {driverData.currentTrip.startLocation}</p>
              <p>To: {driverData.currentTrip.endLocation}</p>
              <p>Status: {driverData.currentTrip.status}</p>
              <button onClick={endTrip} className="end-trip-btn">
                End Trip
              </button>
            </div>
          </div>
        ) : (
          <div className="no-trip">
            <h2>No Active Trip</h2>
            <button onClick={startTrip} className="start-trip-btn">
              Start New Trip
            </button>
          </div>
        )}

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {/* Activity items will be populated here */}
            <p>No recent activity</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
