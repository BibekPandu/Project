import React, { useState, useContext } from "react";
import "./Dashboard.css"; // Import your CSS file
import { UserContext } from "../../context/UserContext"; // We'll create this context

const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const userContext = useContext(UserContext);
  const user = userContext?.user || { role: "staff" }; // Provide default value if context is not available

  // Car management system data
  const userData = {
    admin: {
      stats: {
        totalCars: "150",
        availableCars: "45",
        rentedCars: "95",
        maintenanceCars: "10",
      },
      recentActivities: [
        {
          id: 1,
          carModel: "Toyota Camry",
          status: "Rented",
          customer: "John Smith",
          duration: "3 days",
        },
        {
          id: 2,
          carModel: "Honda Civic",
          status: "Available",
          customer: "-",
          duration: "-",
        },
        {
          id: 3,
          carModel: "BMW X5",
          status: "Maintenance",
          customer: "-",
          duration: "2 days",
        },
        {
          id: 4,
          carModel: "Tesla Model 3",
          status: "Rented",
          customer: "Sarah Johnson",
          duration: "1 week",
        },
        {
          id: 5,
          carModel: "Ford Mustang",
          status: "Available",
          customer: "-",
          duration: "-",
        },
        {
          id: 6,
          carModel: "Audi A4",
          status: "Rented",
          customer: "Mike Brown",
          duration: "2 days",
        },
        {
          id: 7,
          carModel: "Mercedes C-Class",
          status: "Maintenance",
          customer: "-",
          duration: "1 day",
        },
        {
          id: 8,
          carModel: "Hyundai Sonata",
          status: "Available",
          customer: "-",
          duration: "-",
        },
        {
          id: 9,
          carModel: "Chevrolet Malibu",
          status: "Rented",
          customer: "Lisa Davis",
          duration: "4 days",
        },
      ],
    },
    manager: {
      stats: {
        totalCars: "100",
        availableCars: "30",
        rentedCars: "65",
        maintenanceCars: "5",
      },
      recentActivities: [
        {
          id: 1,
          carModel: "Toyota Camry",
          status: "Rented",
          customer: "John Smith",
          duration: "3 days",
        },
        {
          id: 2,
          carModel: "Honda Civic",
          status: "Available",
          customer: "-",
          duration: "-",
        },
        {
          id: 3,
          carModel: "BMW X5",
          status: "Maintenance",
          customer: "-",
          duration: "2 days",
        },
        {
          id: 4,
          carModel: "Tesla Model 3",
          status: "Rented",
          customer: "Sarah Johnson",
          duration: "1 week",
        },
        {
          id: 5,
          carModel: "Ford Mustang",
          status: "Available",
          customer: "-",
          duration: "-",
        },
        {
          id: 6,
          carModel: "Audi A4",
          status: "Rented",
          customer: "Mike Brown",
          duration: "2 days",
        },
        {
          id: 7,
          carModel: "Mercedes C-Class",
          status: "Maintenance",
          customer: "-",
          duration: "1 day",
        },
        {
          id: 8,
          carModel: "Hyundai Sonata",
          status: "Available",
          customer: "-",
          duration: "-",
        },
        {
          id: 9,
          carModel: "Chevrolet Malibu",
          status: "Rented",
          customer: "Lisa Davis",
          duration: "4 days",
        },
      ],
    },
    staff: {
      stats: {
        totalCars: "50",
        availableCars: "15",
        rentedCars: "30",
        maintenanceCars: "5",
      },
      recentActivities: [
        {
          id: 1,
          carModel: "Toyota Camry",
          status: "Rented",
          customer: "John Smith",
          duration: "3 days",
        },
        {
          id: 2,
          carModel: "Honda Civic",
          status: "Available",
          customer: "-",
          duration: "-",
        },
        {
          id: 3,
          carModel: "BMW X5",
          status: "Maintenance",
          customer: "-",
          duration: "2 days",
        },
        {
          id: 4,
          carModel: "Tesla Model 3",
          status: "Rented",
          customer: "Sarah Johnson",
          duration: "1 week",
        },
        {
          id: 5,
          carModel: "Ford Mustang",
          status: "Available",
          customer: "-",
          duration: "-",
        },
      ],
    },
  };

  const currentUserData = userData[user.role || "staff"];

  return (
    <div className="dashboard-page">
      <div className="main-container">
        {/* Conditional class for navigation based on state */}
        <div className={`navcontainer ${!isNavOpen ? "navclose" : ""}`}></div>
        <div className="main">
          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">
                  {currentUserData.stats.totalCars}
                </h2>
                <h2 className="topic">Total Cars</h2>
              </div>
              <img alt="Total Cars" />
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">
                  {currentUserData.stats.availableCars}
                </h2>
                <h2 className="topic">Available Cars</h2>
              </div>
              <img alt="Available Cars" />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">
                  {currentUserData.stats.rentedCars}
                </h2>
                <h2 className="topic">Rented Cars</h2>
              </div>
              <img alt="Rented Cars" />
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="topic-heading">
                  {currentUserData.stats.maintenanceCars}
                </h2>
                <h2 className="topic">In Maintenance</h2>
              </div>
              <img alt="Maintenance" />
            </div>
          </div>

          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Recent Activities</h1>
              <button className="view">View All</button>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                <h3 className="t-op">Car Model</h3>
                <h3 className="t-op">Status</h3>
                <h3 className="t-op">Customer</h3>
                <h3 className="t-op">Duration</h3>
              </div>

              <div className="items">
                {currentUserData.recentActivities.map((activity) => (
                  <div className="item1" key={activity.id}>
                    <h3 className="t-op-nextlvl">{activity.carModel}</h3>
                    <h3 className="t-op-nextlvl label-tag">
                      {activity.status}
                    </h3>
                    <h3 className="t-op-nextlvl">{activity.customer}</h3>
                    <h3 className="t-op-nextlvl">{activity.duration}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
