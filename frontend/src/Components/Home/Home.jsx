import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Settings from "../../Pages/Settings";
import Profile from "../../Pages/Profile/Profile";
import Logout from "../../Pages/Logout";
import VehicleRegister from "../../Pages/VehicleRegister/VehicleRegister";
import "./Home.css";

const Home = () => {
  const userRole = localStorage.getItem("userRole");

  // Role-based route protection
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={`/${userRole}-dashboard`} replace />;
    }
    return children;
  };

  return (
    <div className="home-content">
      <Routes>
        {/* Shared sub-routes (e.g., /admin-dashboard/settings) */}
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

        {/* Default redirect (e.g., /admin-dashboard → AdminDashboard) */}
        <Route
          path="*"
          element={<Navigate to={`/${userRole}-dashboard`} replace />}
        />
      </Routes>
    </div>
  );
};

export default Home;
