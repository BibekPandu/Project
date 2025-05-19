import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN LOGIC
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(user));
        setError("");
        // Redirect based on role
        if (user.role === "admin") {
          navigate("/home/admin-dashboard");
        } else {
          navigate("/home/client-dashboard");
        }
      } else {
        setError("Invalid email or password.");
      }
    } else {
      // REGISTRATION LOGIC
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.role
      ) {
        setError("Please fill in all fields.");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find((u) => u.email === formData.email)) {
        setError("Email already registered.");
        return;
      }
      // Save new user
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        registrationDate: new Date().toLocaleDateString(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setError("");
      alert("Registration successful! Please log in.");
      setIsLogin(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
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
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
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

            {/* Role selection for registration */}
            {!isLogin && (
              <div className="input-box">
                <label htmlFor="role" className="role-label">
                  Register as:
                </label>
                <br />
                <select
                  name="role"
                  id="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className="role-select"
                >
                  <option value="">Select Role</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {isLogin && (
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
                <button
                  type="button"
                  className="link-button"
                  onClick={() =>
                    alert("Forgot password functionality coming soon!")
                  }
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

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
