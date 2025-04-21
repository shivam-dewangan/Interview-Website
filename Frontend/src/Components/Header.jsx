import React from "react";
import "./Header.css"
import image from "../assets/male.png"
const Header = () => {
  return (
    <header className="header">
      <div className="logo-section">
        <img
          src={image} // Replace with your actual profile picture path
          alt="Profile"
          className="profile-pic"
        />
        <h1 className="title">Interview Ace</h1>
      </div>
      <nav className="nav">
        <a href="#about" className="nav-link">About</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#resume" className="nav-link">Resume</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
