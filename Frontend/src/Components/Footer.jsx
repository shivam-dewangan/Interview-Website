import React from "react";
import "./Footer.css"; // Importing the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} My Interview. All Rights Reserved.</p>
      <nav className="footer-nav">
        <a href="#privacy" className="footer-link">Privacy Policy</a>
        <a href="#terms" className="footer-link">Terms of Service</a>
        <a href="#contact" className="footer-link">Contact</a>
      </nav>
    </footer>
  );
};

export default Footer;
