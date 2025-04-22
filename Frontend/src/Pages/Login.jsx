import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // Your login API service
import "./Login.css";
import bgVideo from "../assets/bg.mp4";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Log the email and password to ensure it's correct (for debugging purposes)
      console.log("Email:", email);
      console.log("Password:", password);

      const res = await login({ email, password }); // Call your login API
      console.log('Login response:', res); // Log the response for debugging

      // Store necessary data in localStorage for demo purposes
      localStorage.setItem("email", email);
      localStorage.setItem("password", password); // ⚠️ This is just for testing/demo

      alert("Login Successful!");
      navigate("/home"); // Navigate to the home page after successful login
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="login-container">
      {/* Background video */}
      <video autoPlay loop muted className="background-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login form */}
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
