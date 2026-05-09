// Cite as done by all group members: 
// The navbar is group and human driven and demonstrates basic learning of 
// react-components and done by all group members

import { NavLink } from "react-router";
import { useState } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-bar">
      <nav className="nav-container">

        {/* Logo */}
        <NavLink to="/" className="nav-logo">
          GameForge
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          <NavLink
            to="/filter"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/publish"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Publish
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            My Account
          </NavLink>

          {/* <NavLink
            to="/settings"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Settings
          </NavLink> */}

          <NavLink
            to="/login-page"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Login/Signup
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
