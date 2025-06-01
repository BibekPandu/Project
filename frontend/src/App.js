import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister/LoginRegister";
import Home from "./Components/Home/Home";

function App() {
  // Check if user is authenticated
  const isAuthenticated =
    localStorage.getItem("token") && localStorage.getItem("userRole");

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginRegister />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/home/*"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* Role-specific dashboard routes */}
      <Route
        path="/admin-dashboard/*"
        element={
          isAuthenticated && localStorage.getItem("userRole") === "admin" ? (
            <Home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/manager-dashboard/*"
        element={
          isAuthenticated && localStorage.getItem("userRole") === "manager" ? (
            <Home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/driver-dashboard/*"
        element={
          isAuthenticated && localStorage.getItem("userRole") === "driver" ? (
            <Home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch all route */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
