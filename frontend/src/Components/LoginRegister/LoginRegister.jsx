import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./LoginRegister.css";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Login data:", formData);
      // Navigate to Home page after successful login
      navigate("/home"); // Adjust the path as necessary
    } else {
      // Handle registration logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Register data:", formData);
    }
  };

  return (
    <div className="login-box">
      <div className="wrapper">
        <div className="form-box">
          <div className="form-header">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <button
              className="btn btn-border"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create Account" : "Already Registered?"}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <FaUser className="icon" />
              </div>
            )}

            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <FaEnvelope className="icon" />
            </div>

            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <FaLock className="icon" />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {!isLogin && (
              <div className="input-box">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <FaLock className="icon" />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            )}

            {isLogin && (
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
