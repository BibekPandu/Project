import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";
import {
  FaUsers,
  FaTruck,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    activeDrivers: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || userRole !== "admin") {
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
        "http://localhost:5000/api/admin/dashboard"
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
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="nav-brand">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="nav-links">
          <button onClick={() => navigate("/admin/users")}>
            <FaUsers /> Manage Users
          </button>
          <button onClick={() => navigate("/admin/vehicles")}>
            <FaTruck /> Manage Vehicles
          </button>
          <button onClick={() => navigate("/admin/reports")}>
            <FaChartLine /> Reports
          </button>
          <button onClick={() => navigate("/admin/settings")}>
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
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Vehicles</h3>
            <p>{stats.totalVehicles}</p>
          </div>
          <div className="stat-card">
            <h3>Active Drivers</h3>
            <p>{stats.activeDrivers}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Requests</h3>
            <p>{stats.pendingRequests}</p>
          </div>
        </div>

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

export default AdminDashboard;
