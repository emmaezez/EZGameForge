// The footer component is a human driven component that 
// utilizes basic react knowledge of reusable components.
// I implemented the footer component and did initial debugging 
// on the css so responds correctly.

// Human Citation: Added reusable content for GameForge:
// footer section with basic react
import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-center">
        <p>&copy; 2025 GameForge</p>
      </div>

      <nav className="footer-right">
        <Link to="/guidelines">Guidelines/Terms</Link>
        <Link to="/about">About</Link>
      </nav>
    </footer>
  );
}
