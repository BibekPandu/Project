import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManagerDashboard.css";
import {
  FaTruck,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Settings from "../../../Components/Settings/Settings";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeDrivers: 0,
    pendingMaintenance: 0,
    completedTrips: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is manager
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "manager") {
      navigate("/login");
      return;
    }

    // Set authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Fetch dashboard data
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/manager/dashboard"
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manager-dashboard">
      <nav className="manager-nav">
        <div className="nav-brand">
          <h1>Manager Dashboard</h1>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate("/manager/vehicles")}>
            <FaTruck /> Manage Vehicles
          </button>
          <button onClick={() => navigate("/manager/drivers")}>
            <FaUsers /> Manage Drivers
          </button>
          <button onClick={() => navigate("/manager/trips")}>
            <FaClipboardList /> Trip Management
          </button>
          <button onClick={() => setShowSettings(true)}>
            <FaCog /> Settings
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Vehicles</h3>
            <p>{stats.totalVehicles}</p>
          </div>
          <div className="stat-card">
            <h3>Active Drivers</h3>
            <p>{stats.activeDrivers}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Maintenance</h3>
            <p>{stats.pendingMaintenance}</p>
          </div>
          <div className="stat-card">
            <h3>Completed Trips</h3>
            <p>{stats.completedTrips}</p>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button onClick={() => navigate("/manager/vehicles/add")}>
              Add New Vehicle
            </button>
            <button onClick={() => navigate("/manager/drivers/assign")}>
              Assign Driver
            </button>
            <button onClick={() => navigate("/manager/maintenance/schedule")}>
              Schedule Maintenance
            </button>
          </div>
        </div>

        <div className="recent-trips">
          <h2>Recent Trips</h2>
          <div className="trip-list">
            {/* Trip items will be populated here */}
            <p>No recent trips</p>
          </div>
        </div>
      </main>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default ManagerDashboard;
