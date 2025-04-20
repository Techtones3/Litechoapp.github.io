// F:\Project\Project\react-frontend\src\components\Home.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import InstructionsAnimation from "../components/InstructionsAnimation";
import "./Home.css"; // Ensure you update or add your custom styles

function Home() {
  const [loading, setLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Simulate a loading delay (e.g., data fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setShowInstructions(true);
  };

  return (
    <div className="home-screen">
      {/* Navbar always displayed */}
      <Navbar />

      {/* Main content container */}
      <div className="home-container">
        {loading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : (
          <div className="home-content card">
            <h1 className="hero-title">Welcome to LitEcho!</h1>
            <p className="hero-subtitle">
              Your Audio Book Companion. Convert text, PDFs, and images to audio with ease.
            </p>
            <button className="convert-button" onClick={handleGetStarted}>
              Get Started
            </button>

            {/* Show animated instructions after clicking Get Started */}
            {showInstructions && <InstructionsAnimation />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
