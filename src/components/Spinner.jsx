// Spinner.jsx
import React from 'react';

export default function Spinner({
  size = 8,             // Tailwind size scale (e.g. 8 → 2rem)
  color = 'blue-500',   // Tailwind color
  thickness = 4,        // Border thickness scale
}) {
  const sizeClass = `w-${size} h-${size}`;
  const borderClass = `border-${thickness}`;
  const colorClass = `border-${color}`;
  
  return (
    <div
      className={`
        ${sizeClass}
        ${borderClass} ${colorClass} border-solid border-t-transparent
        rounded-full
        animate-spin
      `}
    />
  );
}
