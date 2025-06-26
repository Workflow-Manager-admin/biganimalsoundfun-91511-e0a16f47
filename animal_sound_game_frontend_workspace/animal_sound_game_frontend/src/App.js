import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * SVGs for animal icons — scalable and bright for kid-friendly visual appeal.
 * In production, these could be replaced with branded images if needed.
 */
const AnimalSVGs = {
  dog: (
    // PUBLIC_INTERFACE
    // Simple dog SVG with bold lines and colors
    <svg width="100" height="100" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="54" r="36" fill="#f6d7b0" stroke="#9a6c39" strokeWidth="4"/>
      <ellipse cx="32" cy="68" rx="6" ry="8" fill="#fff"/>
      <ellipse cx="64" cy="68" rx="6" ry="8" fill="#fff"/>
      <ellipse cx="32" cy="68" rx="2" ry="3" fill="#333"/>
      <ellipse cx="64" cy="68" rx="2" ry="3" fill="#333"/>
      <ellipse cx="48" cy="65" rx="4" ry="2.5" fill="#333"/>
      <path d="M20 32 Q4 16 24 16 T36 32" fill="#be9245"/>
      <path d="M76 32 Q92 16 72 16 T60 32" fill="#be9245"/>
    </svg>
  ),
  cat: (
    // PUBLIC_INTERFACE
    // Simple cat SVG with cute ears and whiskers
    <svg width="100" height="100" viewBox="0 0 96 96" aria-hidden="true">
      <ellipse cx="48" cy="54" rx="36" ry="36" fill="#f9e6c5" stroke="#c1892d" strokeWidth="4"/>
      <polygon points="17,34 9,10 35,27" fill="#eee0bb" stroke="#c1892d" strokeWidth="2"/>
      <polygon points="79,34 87,10 61,27" fill="#eee0bb" stroke="#c1892d" strokeWidth="2"/>
      <ellipse cx="38" cy="72" rx="6" ry="8" fill="#fff"/>
      <ellipse cx="58" cy="72" rx="6" ry="8" fill="#fff"/>
      <ellipse cx="38" cy="72" rx="2" ry="3" fill="#333"/>
      <ellipse cx="58" cy="72" rx="2" ry="3" fill="#333"/>
      <ellipse cx="48" cy="80" rx="4" ry="2.5" fill="#333"/>
      <line x1="18" y1="70" x2="30" y2="70" stroke="#c1892d" strokeWidth="2"/>
      <line x1="66" y1="70" x2="78" y2="70" stroke="#c1892d" strokeWidth="2"/>
      <line x1="18" y1="73" x2="30" y2="75" stroke="#c1892d" strokeWidth="1.2"/>
      <line x1="66" y1="73" x2="78" y2="75" stroke="#c1892d" strokeWidth="1.2"/>
    </svg>
  ),
  lion: (
    // PUBLIC_INTERFACE
    // Simple lion SVG with mane and friendly features
    <svg width="100" height="100" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="54" r="28" fill="#ffce69" stroke="#bc8c17" strokeWidth="4"/>
      <circle cx="48" cy="54" r="38" fill="none" stroke="#fdb913" strokeWidth="12"/>
      <ellipse cx="38" cy="66" rx="5" ry="7" fill="#fff"/>
      <ellipse cx="58" cy="66" rx="5" ry="7" fill="#fff"/>
      <ellipse cx="38" cy="66" rx="2" ry="2.8" fill="#333"/>
      <ellipse cx="58" cy="66" rx="2" ry="2.8" fill="#333"/>
      <ellipse cx="48" cy="75" rx="4" ry="2" fill="#a96c00"/>
      <ellipse cx="32" cy="40" rx="6" ry="8" fill="#ffce69" stroke="#bc8c17" strokeWidth="2" />
      <ellipse cx="64" cy="40" rx="6" ry="8" fill="#ffce69" stroke="#bc8c17" strokeWidth="2" />
    </svg>
  ),
  duck: (
    // PUBLIC_INTERFACE
    // Simple duck SVG with yellow tone and orange beak
    <svg width="100" height="100" viewBox="0 0 96 96" aria-hidden="true">
      <ellipse cx="52" cy="60" rx="32" ry="28" fill="#ffe877" stroke="#c9a135" strokeWidth="4"/>
      <ellipse cx="72" cy="64" rx="10" ry="6" fill="#fff"/>
      <ellipse cx="72" cy="64" rx="3" ry="2" fill="#333"/>
      <ellipse cx="40" cy="46" rx="16" ry="18" fill="#ffe877" stroke="#c9a135" strokeWidth="2"/>
      <ellipse cx="65" cy="74" rx="9" ry="4" fill="#fff3c0"/>
      <ellipse cx="40" cy="64" rx="4" ry="3" fill="#333"/>
      <rect x="14" y="64" width="20" height="6" rx="5" fill="#ffba4d" stroke="#f08a00" strokeWidth="2"/>
      <rect x="6" y="66" width="12" height="4" rx="2" fill="#ffba4d" stroke="#f08a00" strokeWidth="1"/>
    </svg>
  ),
};

/**
 * Animal meta definition for rendering and sound playback.
 * You may replace 'sound' property values with paths to actual local animal sound files.
 */
const animals = [
  {
    key: "dog",
    label: "Dog",
    svg: AnimalSVGs.dog,
    sound: "/sounds/dog.mp3"
  },
  {
    key: "cat",
    label: "Cat",
    svg: AnimalSVGs.cat,
    sound: "/sounds/cat.mp3"
  },
  {
    key: "lion",
    label: "Lion",
    svg: AnimalSVGs.lion,
    sound: "/sounds/lion.mp3"
  },
  {
    key: "duck",
    label: "Duck",
    svg: AnimalSVGs.duck,
    sound: "/sounds/duck.mp3"
  }
];

/**
 * PUBLIC_INTERFACE
 * Main App component for Animal Sound Game.
 * Renders grid of animal icons and plays animal sounds on click.
 */
function App() {
  const [activeIdx, setActiveIdx] = useState(null); // for click animation
  const [theme, setTheme] = useState("light");

  // Apply theme to :root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  /**
   * Handles click on animal icon – plays sound and gives visual feedback.
   */
  const handleAnimalClick = (idx, animal) => {
    setActiveIdx(idx);

    // Play local sound (ensure local/audio file exists at specified path)
    const audio = new window.Audio(animal.sound);
    audio.play().catch(() => {
      // Swallow error if file missing or not loaded yet.
    });

    // Reset visual feedback after short delay
    setTimeout(() => setActiveIdx(null), 180);
  };

  // PUBLIC_INTERFACE
  /**
   * Toggles app theme (light only, but code is present for easy expansion).
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="App animal-app-bg">
      <header className="animal-header">
        <span className="game-title" role="img" aria-label="Animal Sound Game">
          🦁🐶🐱🐥 Big Animal Sound Fun!
        </span>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <section className="animal-grid">
        {animals.map((animal, idx) => (
          <button
            type="button"
            key={animal.key}
            className={`animal-btn${activeIdx === idx ? " pressed" : ""}`}
            onClick={() => handleAnimalClick(idx, animal)}
            aria-label={animal.label}
            tabIndex={0}
          >
            <div className="animal-svg">{animal.svg}</div>
            <span className="animal-label">{animal.label}</span>
          </button>
        ))}
      </section>
      <footer className="animal-footer">
        <p>
          <span role="img" aria-label="headphones">🎧</span>
          Tap an animal to hear its sound!
        </p>
        <p className="sources-note">
          Sounds: Place local audio files in <code>/sounds/</code> (e.g., /sounds/dog.mp3).
        </p>
      </footer>
    </div>
  );
}

export default App;
