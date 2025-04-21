import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./register.css"; // <-- Import the CSS file
//registration page
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });
      setMessage(response.data.message);

      // Automatically redirect to login if registration is successful
      if (response.data.message === "Registration successful") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed");
    }
  };
 

  return (
    <div className="register-container">
      {/* Left side: image */}
      <div className="register-left">
        <img src="/side.jpg" alt="headphones" className="register-image" />
      </div>

      {/* Right side: form */}
      <div className="register-right">
        <div className="register-content">
        <div className="register-header">
              <img
                src="/logo1.svg"
                alt="headphones"
                className="register-logo2"
              />
              <h1 className="register-logo">LitEcho</h1>
            </div>
          <h5 className="register-subtitle">Your Audio Book Companion</h5>
          <p className="register-paragraph">
            easy-to-use system that converts these types of documents which
            includes PDFs and text files and images into audio formats for easy
            user listening anytime
          </p>
          <h2 className="register-heading">Registration</h2>

          <form className="register-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="userID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            <button type="submit" className="register-button">
              Sign Up
            </button>
          </form>

          {message && <p className="register-message">{message}</p>}

          <div className="register-footer">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
