import React, { useEffect, useState } from 'react';
import './InstructionsAnimation.css';

const InstructionsAnimation = () => {
  // Define the list of instructions you want to display
  const instructions = [
    "Step 1: Navigate to the Audio Converter.",
    "Step 2: Choose the file type you want to convert.",
    "Step 3: Enter your text or upload your file.",
    "Step 4: Click 'Convert to Audio' to generate the audio.",
    "Step 5: Listen to or download your audio file.",
    "Step 5: User can also access the audio history.",
    "Step 6: The additional features can be found in the nav bar use accordingly."
  ];

  // Manage which instruction is currently visible
  const [currentStep, setCurrentStep] = useState(0);

  // Change the instruction every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < instructions.length - 1 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [instructions.length]);

  return (
    <div className="instructions-container">
      <div className="instruction-text">
        {instructions[currentStep]}
      </div>
    </div>
  );
};

export default InstructionsAnimation;
