import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaMobile,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "driver",
  });

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (token && userRole) {
      switch (userRole) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "manager":
          navigate("/manager-dashboard");
          break;
        case "driver":
          navigate("/driver-dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone) => {
    return String(phone).match(/^[0-9]{10}$/);
  };

  const validateForm = () => {
    if (isLogin) {
      const identifier = formData.email || formData.phone;
      if (!identifier) {
        setError("Please enter email or phone number");
        return false;
      }

      if (formData.email && !validateEmail(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }

      if (formData.phone && !validatePhone(formData.phone)) {
        setError("Please enter a valid 10-digit phone number");
        return false;
      }

      if (!formData.password) {
        setError("Please enter your password");
        return false;
      }
    } else {
      if (!formData.email || !validateEmail(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }

      if (!formData.phone || !validatePhone(formData.phone)) {
        setError("Please enter a valid 10-digit phone number");
        return false;
      }

      if (!formData.password) {
        setError("Please enter a password");
        return false;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login API call
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.role,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        // Store user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userId", data.user.id);

        // Redirect based on role
        switch (data.user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "manager":
            navigate("/manager-dashboard");
            break;
          case "driver":
            navigate("/driver-dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        // Registration API call
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.role,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        setIsLogin(true);
        setError("");
        setFormData({
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: "driver",
        });
        alert("Registration successful! Please login.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>Vehicle Management System</h2>
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
                setError("");
                setFormData({
                  email: "",
                  phone: "",
                  password: "",
                  confirmPassword: "",
                  role: "driver",
                });
              }}
            >
              Login
            </button>
            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
                setError("");
                setFormData({
                  email: "",
                  phone: "",
                  password: "",
                  confirmPassword: "",
                  role: "driver",
                });
              }}
            >
              Register
            </button>
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isLogin ? (
            <>
              <div className="form-group">
                <label>
                  <FaEnvelope className="form-icon" />
                  Email or Phone
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email or phone number"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>
                  <FaEnvelope className="form-icon" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FaMobile className="form-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>
              <FaLock className="form-icon" />
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>
                <FaLock className="form-icon" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>
              <FaShieldAlt className="form-icon" />
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="role-selector"
            >
              <option value="driver">Driver</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>

          {isLogin && (
            <div className="auth-links">
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
