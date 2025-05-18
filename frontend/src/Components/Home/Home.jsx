import React from "react";
import NavBar from "../Navbar/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />

      <main className="main-content">
        {/* Parallax sections */}
        <section className="parallax-section hero-section">
          <div className="parallax-content">
            <h1>Welcome to Your Dashboard</h1>
            <p>Experience seamless navigation with our intuitive interface</p>
          </div>
        </section>

        <section className="content-section">
          <div className="content-card">
            <h2>Recent Activity</h2>
            <p>Your latest updates and notifications appear here</p>
          </div>
        </section>

        <section className="parallax-section stats-section">
          <div className="parallax-content">
            <h2>Performance Metrics</h2>
            <div className="stats-grid">
              <div className="stat-card">Users: 1,240</div>
              <div className="stat-card">Products: 356</div>
              <div className="stat-card">Revenue: $48,290</div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="content-card">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn">Add Product</button>
              <button className="action-btn">View Gallery</button>
              <button className="action-btn">Generate Report</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
