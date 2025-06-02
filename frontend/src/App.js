import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import AdminDashboard from "./Components/Dashboard/AdminDashboard/AdminDashboard";
import ManagerDashboard from "./Components/Dashboard/ManagerDashboard/ManagerDashboard";
import DriverDashboard from "./Components/Dashboard/DriverDashboard/DriverDashboard";

function App() {
  const isAuthenticated =
    localStorage.getItem("token") && localStorage.getItem("userRole");

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginRegister />} />

      {/* Role-specific dashboards */}
      <Route
        path="/admin-dashboard/*"
        element={
          isAuthenticated && localStorage.getItem("userRole") === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manager-dashboard/*"
        element={
          isAuthenticated && localStorage.getItem("userRole") === "manager" ? (
            <ManagerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/driver-dashboard/*"
        element={
          isAuthenticated && localStorage.getItem("userRole") === "driver" ? (
            <DriverDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch-all route */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate
              to={`/${localStorage.getItem("userRole")}-dashboard`}
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
