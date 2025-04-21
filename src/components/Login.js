import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import "./login.css";

//login changes
function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      setMessage(response.data.message);

      if (response.data.message === "Login successful") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userId", response.data.user_id);
        setIsLoggedIn(true); // ✅ update App state instantly
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src="/side.jpg" alt="headphones" className="register-image" />
      </div>

      <div className="register-right">
        <div className="register-content">
          <div className="register-header">
            <img src="/logo1.svg" alt="logo" className="register-logo2" />
            <h1 className="register-logo">LitEcho</h1>
          </div>

          <h5 className="register-subtitle">Your Audio Book Companion</h5>
          <p className="register-paragraph">
            Easy-to-use system that converts PDFs, text files, and images into audio formats for effortless listening anytime.
          </p>

          <h2 className="register-heading">Login</h2>

          <form className="register-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="register-button">Login</button>
          </form>

          {message && <p className="register-message">{message}</p>}

          <div className="register-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
