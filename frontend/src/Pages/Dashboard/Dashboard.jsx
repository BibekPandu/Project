import "./Dashboard.css";
import { useState, useEffect } from "react";
import {
  FaCar,
  FaGasPump,
  FaSearch,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaOilCan,
} from "react-icons/fa";
import { MdElectricCar, MdSpeed } from "react-icons/md";
import { GiCarWheel } from "react-icons/gi";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-datalabels";

Chart.register(...registerables);

const Dashboard = () => {
  const [realTimeData, setRealTimeData] = useState({
    speed: 0,
    fuel: 75,
    battery: 92,
    engineTemp: 85,
    oilLevel: 100,
    tirePressure: 32,
    alerts: 2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        speed: Math.min(prev.speed + (Math.random() * 2 - 1), 120),
        fuel: Math.max(0, prev.fuel - 0.1),
        battery: prev.battery > 20 ? prev.battery - 0.05 : 100,
        engineTemp: 80 + Math.random() * 10,
        oilLevel: Math.max(90, prev.oilLevel - 0.01),
        tirePressure: 30 + Math.random() * 4,
        alerts: prev.alerts,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fleetData = [
    {
      id: 1,
      model: "Tesla Model S",
      status: "active",
      location: "San Francisco",
      speed: 65,
    },
    {
      id: 2,
      model: "Toyota Prius",
      status: "maintenance",
      location: "Los Angeles",
      speed: 45,
    },
    {
      id: 3,
      model: "Ford F-150",
      status: "active",
      location: "Chicago",
      speed: 72,
    },
    { id: 4, model: "BMW i8", status: "idle", location: "New York", speed: 0 },
  ];

  const speedChartData = {
    labels: Array(24)
      .fill()
      .map((_, i) => `${i}:00`),
    datasets: [
      {
        label: "Speed (mph)",
        data: Array(24)
          .fill()
          .map(() => Math.floor(Math.random() * 100)),
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const fuelConsumptionData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Fuel Consumption (L)",
        data: [12, 19, 15, 21, 18, 16, 14],
        backgroundColor: "#36a2eb",
      },
    ],
  };

  const vehicleStatusData = {
    labels: ["Active", "Maintenance", "Idle"],
    datasets: [
      {
        data: [12, 3, 2],
        backgroundColor: ["#4bc0c0", "#ff6384", "#ffcd56"],
      },
    ],
  };

  return (
    <div>
      <div className="main-content">
        <header className="top-bar">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search vehicles, drivers..." />
          </div>
        </header>
        {/* Dashboard Content */}
        <div className="content">
          {/* Real-time Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="icon speed">
                <MdSpeed />
              </div>
              <div className="info">
                <h3>Speed</h3>
                <h2>
                  {realTimeData.speed.toFixed(1)} <small>mph</small>
                </h2>
              </div>
              <div className="trend up">+2.5%</div>
            </div>

            <div className="stat-card">
              <div className="icon fuel">
                <FaGasPump />
              </div>
              <div className="info">
                <h3>Fuel Level</h3>
                <h2>{realTimeData.fuel.toFixed(1)}%</h2>
              </div>
              <div className="trend down">-1.2%</div>
            </div>

            <div className="stat-card">
              <div className="icon battery">
                <MdElectricCar />
              </div>
              <div className="info">
                <h3>Battery</h3>
                <h2>{realTimeData.battery.toFixed(1)}%</h2>
              </div>
              <div className="trend down">-0.5%</div>
            </div>

            <div className="stat-card">
              <div className="icon alerts">
                <FaExclamationTriangle />
              </div>
              <div className="info">
                <h3>Alerts</h3>
                <h2>{realTimeData.alerts}</h2>
              </div>
              <div className="trend">Active</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="charts-row">
            <div className="chart-container">
              <h3>Speed Over Time</h3>
              <Line
                data={speedChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>

            <div className="chart-container">
              <h3>Fuel Consumption</h3>
              <Bar
                data={fuelConsumptionData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
          </div>

          {/* Fleet Status and Vehicle Details */}
          <div className="details-row">
            <div className="fleet-status">
              <h3>Fleet Status</h3>
              <div className="pie-chart-container">
                <Pie
                  data={vehicleStatusData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "right" },
                    },
                  }}
                />
              </div>
            </div>

            <div className="vehicle-details">
              <h3>Active Vehicles</h3>
              <div className="vehicle-list">
                {fleetData.map((vehicle) => (
                  <div key={vehicle.id} className="vehicle-card">
                    <div className="vehicle-image">
                      <FaCar />
                    </div>
                    <div className="vehicle-info">
                      <h4>{vehicle.model}</h4>
                      <p>
                        <FaMapMarkerAlt /> {vehicle.location}
                      </p>
                      <div className="vehicle-stats">
                        <span>
                          <MdSpeed /> {vehicle.speed} mph
                        </span>
                        <span className={`status ${vehicle.status}`}>
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <h4>Engine Temperature</h4>
              <div className="metric-value">
                <FaOilCan />
                <span>{realTimeData.engineTemp.toFixed(1)}°F</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${(realTimeData.engineTemp / 120) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="metric-card">
              <h4>Oil Level</h4>
              <div className="metric-value">
                <FaOilCan />
                <span>{realTimeData.oilLevel.toFixed(1)}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${realTimeData.oilLevel}%` }}
                ></div>
              </div>
            </div>

            <div className="metric-card">
              <h4>Tire Pressure</h4>
              <div className="metric-value">
                <GiCarWheel />
                <span>{realTimeData.tirePressure.toFixed(1)} psi</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${(realTimeData.tirePressure / 40) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
