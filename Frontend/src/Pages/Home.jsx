import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; 
import bannerImage from "../assets/background.webp";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Corrected token key
    const isLoggedIn = localStorage.getItem("userToken"); 
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="home">
      {/* Banner Image */}
      <div className="banner">
        <img src={bannerImage} alt="AI Interview Banner" />
      </div>

      <section className="hero">
        <h1>Make Your Interview Easy with Our AI Interview</h1>
        <p>Practice and prepare for your next job interview with AI-powered mock interviews.</p>
      </section>

      <section className="interview-options">
        <h2>Choose Your Interview Type</h2>
        <div className="interview-list">
          <div className="interview-card" onClick={() => navigate("/mern-stack")}>MERN Stack</div>
          <div className="interview-card" onClick={() => navigate("/ai-ml")}>AI & Machine Learning</div>
          <div className="interview-card" onClick={() => navigate("/data-analytics")}>Data Analytics</div>
          <div className="interview-card" onClick={() => navigate("/ethical-hacking")}>Ethical Hacking</div>
          <div className="interview-card" onClick={() => navigate("/cybersecurity")}>Cybersecurity</div>
          <div className="interview-card" onClick={() => navigate("/aws")}>AWS</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
