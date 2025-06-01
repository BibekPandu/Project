import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard";
import ManagerDashboard from "../Dashboard/ManagerDashboard/ManagerDashboard";
import DriverDashboard from "../Dashboard/DriverDashboard/DriverDashboard";
import Settings from "../../Pages/Settings";
import Profile from "../../Pages/Profile/Profile";
import Logout from "../../Pages/Logout";
import "./Home.css";
import VehicleRegister from "../../Pages/VehicleRegister/VehicleRegister";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || !userRole) {
      navigate("/login");
    }
  }, [navigate]);

  // Get user role from localStorage
  const userRole = localStorage.getItem("userRole");

  // Role-based route protection
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={`/${userRole}-dashboard`} replace />;
    }
    return children;
  };

  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="home-content">
        <Routes>
          {/* Role-specific dashboards */}
          <Route
            path="admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="manager-dashboard"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="driver-dashboard"
            element={
              <ProtectedRoute allowedRoles={["driver"]}>
                <DriverDashboard />
              </ProtectedRoute>
            }
          />

          {/* Common routes */}
          <Route
            path="vehicleregister"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <VehicleRegister />
              </ProtectedRoute>
            }
          />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />

          {/* Default redirect based on role */}
          <Route
            path="*"
            element={<Navigate to={`/${userRole}-dashboard`} replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
