// src/components/OnboardingTour.jsx
import React, { useEffect } from "react";
import Joyride from "react-joyride";

const OnboardingTour = ({ run = true, onTourClose = () => {} }) => {
  useEffect(() => {
    console.log("OnboardingTour run prop:", run);
  }, [run]);

  // Define steps for the onboarding tour.
  // Ensure your components include these selectors (e.g., Sidebar has class "sidebar",
  // Main content area has class "main-content", etc.)
  const steps = [
    {
      target: ".sidebar",
      content: "This is your Sidebar. Use it to navigate through the app and quickly access settings.",
      placement: "right", // positions the tooltip to the right of the sidebar
    },
    {
      target: ".main-content",
      content: "This area displays your main content. Here you view details, reports, or any other vital information.",
      placement: "top", // positions the tooltip above the main content
    },
    {
      target: ".toggle-button",
      content: "These toggle buttons let you switch themes and features such as Dark Mode and Colorblind Mode.",
      placement: "bottom",
    },
    {
      target: ".modal-content",
      content: "Here is the Settings Modal. Open it to customize your preferences for the application.",
      placement: "center",
    },
  ];

  const handleJoyrideCallback = (data) => {
    console.log("Joyride callback data:", data);
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];
    if (finishedStatuses.includes(status)) {
      onTourClose();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}                
      continuous={true}
      showSkipButton={true}
      disableBeacon={false}  // Ensures the pulsing beacon is displayed on each target initially
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#0066ff",
        },
        beacon: {
          backgroundColor: "#0066ff",
          border: "2px solid #fff",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        },
        tooltip: {
          fontSize: "1rem",
          textAlign: "center",
        },
      }}
    />
  );
};

export default OnboardingTour;
