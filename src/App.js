// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/Routes";
import SettingsModal from "./components/SettingsModal";
import OnboardingTour from "./components/OnboardingTour";

function App() {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    colorblindMode: false,
    fontSize: "medium",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    if (settings.colorblindMode) {
      document.body.classList.add("color-blind-mode");
    } else {
      document.body.classList.remove("color-blind-mode");
    }

    const root = document.documentElement;
    let newSize;
    switch (settings.fontSize) {
      case "small":
        newSize = "10px";
        break;
      case "medium":
        newSize = "16px";
        break;
      case "large":
        newSize = "20px";
        break;
      default:
        newSize = "16px";
    }
    root.style.setProperty("--base-font-size", newSize);
  }, [settings]);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        {isLoggedIn && <Sidebar onOpenSettings={() => setSettingsModalOpen(true)} />}
        <div className="main-content">
          <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <SettingsModal
          isOpen={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
          settings={settings}
          onSave={handleSaveSettings}
        />
        {isLoggedIn && <OnboardingTour />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
