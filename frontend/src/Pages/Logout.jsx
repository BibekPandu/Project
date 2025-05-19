import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user from localStorage
    localStorage.removeItem("user");
    // Optionally, clear all localStorage if you want a full reset:
    // localStorage.clear();

    // Redirect to LoginRegister page
    navigate("/"); // or navigate("/") if that's your login route
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
