import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService"; // Import the signup API function
import "./Signup.css";
import bgVideo from "../assets/bg.mp4";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await signup({ name, email, password }); // Call the signup API function
      alert("Signup Successful! Please login.");
      navigate("/"); // Redirect to the login page after successful signup
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="signup-container">
      <video autoPlay loop muted className="background-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="signup-box">
        <h2>Create Your AI Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
