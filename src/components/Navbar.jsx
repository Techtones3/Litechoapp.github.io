import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { IoMoonSharp } from "react-icons/io5";
import { GrSun } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { BsVolumeUp } from "react-icons/bs";


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [colorblindMode, setColorblindMode] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);

  // For demonstration, we assume the user is logged in.
  const isLoggedIn = true; // Replace with your actual authentication logic

  // Load saved settings on mount
  useEffect(() => {
    if (!isLoggedIn) return;
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedColorblindMode = localStorage.getItem("colorblindMode") === "true";
    setDarkMode(savedDarkMode);
    setColorblindMode(savedColorblindMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
    document.body.classList.toggle("colorblind-mode", savedColorblindMode);
  }, [isLoggedIn]);

  // Google Translate Setup: Append script only if not present; do not remove on unmount.
  useEffect(() => {
    if (!isLoggedIn) return;

    if (!document.getElementById("google-translate-script")) {
      // Define the callback function for the Google Translate API
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };

      // Create and append the Google Translate script
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      console.log("Google Translate script appended.");
    }
    // Do not remove the script on unmount to avoid duplicate reload issues.
  }, [isLoggedIn]);

  // Helper: Speak provided text via speech synthesis and cancel any ongoing speech
  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // Feature Handlers
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const toggleColorblindMode = () => {
    const newMode = !colorblindMode;
    setColorblindMode(newMode);
    document.body.classList.toggle("colorblind-mode", newMode);
    localStorage.setItem("colorblindMode", newMode);
  };

  // Updated Screen Reader function with the custom message
  const speakNavigationGuide = () => {
    const guide =
      "Welcome to LitEcho, your audio converter. To adjust the display, use the dark mode button for a low-light theme, and the eye icon to optimize contrast for colorblind users. For language options, click the globe icon, and to hear these instructions again, press the screen reader button. Use tab to navigate through the website.";
    speakText(guide);
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="navbar">
      {/* Left side: Brand/Logo */}
      <div className="navbar-left">
        <h2 className="brand-name">LitEcho</h2>
      </div>

      {/* Right side: Buttons and Avatar */}
      <div className="navbar-right">
        {/* Dark Mode Button */}
        <button
          className="toggle-button"
          onClick={toggleDarkMode}
          onFocus={(e) => speakText(e.target.getAttribute("title"))}
          title="Toggle Dark Mode"
        >
          {darkMode ? <IoMoonSharp size={22} /> : <GrSun size={22} />}
        </button>

        {/* Colorblind Mode Button */}
        <button
          className="toggle-button"
          onClick={toggleColorblindMode}
          onFocus={(e) => speakText(e.target.getAttribute("title"))}
          title="Toggle Colorblind Mode"
        >
          <FaEye size={20} />
        </button>

        {/* Translate Button and Widget */}
        <div className="translate-wrapper">
          <button
            className="toggle-button"
            onClick={() => setShowTranslate((prev) => !prev)}
            onFocus={(e) => speakText(e.target.getAttribute("title"))}
            title="Toggle Translate"
          >
            <TbWorld size={22} />
          </button>
          <div
            id="google_translate_element"
            className={showTranslate ? "visible" : "hidden"}
          ></div>
        </div>

        {/* Screen Reader Button */}
        <button
          className="toggle-button"
          onClick={speakNavigationGuide}
          onFocus={(e) => speakText(e.target.getAttribute("title"))}
          title="Screen Reader"
        >
          <BsVolumeUp size={20} />
        </button>

        {/* Profile Avatar */}
        <img
          src="/profile.jpg"
          alt="User Avatar"
          className="navbar-avatar"
          title="Profile"
        />
      </div>
    </nav>
  );
};

export default Navbar;