// Home.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Dashboard from "../../Pages/Dashboard";
// import Products from "../../Pages/Products";
// import Gallery from "../Gallery/Gallery";
import Settings from "../../Pages/Settings";
import Profile from "../../Pages/Profile";
import Logout from "../../Pages/Logout";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="home-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="products" element={<Products />} /> */}
          {/* <Route path="gallery" element={<Gallery />} /> */}
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
