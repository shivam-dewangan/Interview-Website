import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
import "./MernStack.css";

const MernStack = () => {
  const navigate = useNavigate(); // Hook for navigation
  const webcamRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  // Handle resume file input
  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  // Ask for webcam & mic access
  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionsGranted(true);
    } catch (error) {
      console.error("Permission error:", error);
      alert("Please allow access to webcam and microphone.");
    }
  };

  // Start AI Interview Flow
  const startInterview = () => {
    if (!resume) return alert("Please upload your resume.");
    if (!permissionsGranted) return alert("Please enable webcam and microphone.");

    // Navigate to the interview session page
    navigate("/mern-interview-session");
  };

  return (
    <div className="interview-container">
      <h1>MERN Stack Interview</h1>

      {/* Resume Upload Section */}
      <div className="resume-upload">
        <label>Upload Resume (PDF or DOCX)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
        />
        {resume && <p>Selected: {resume.name}</p>}
      </div>

      {/* Webcam Preview Section */}
      <div className="webcam-section">
        {permissionsGranted ? (
          <Webcam
            ref={webcamRef}
            audio
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: "user",
            }}
            className="webcam-preview"
          />
        ) : (
          <div className="webcam-placeholder">
            <p>Webcam is currently disabled.</p>
          </div>
        )}
      </div>

      {/* Enable Webcam/Mic */}
      <button
        onClick={requestPermissions}
        className={permissionsGranted ? "active" : ""}
      >
        {permissionsGranted ? "Webcam & Mic Enabled ✅" : "Enable Webcam & Mic"}
      </button>

      {/* Start Interview Button */}
      <button
        className="start-btn"
        onClick={startInterview}
        disabled={!resume || !permissionsGranted || uploading}
      >
        {uploading ? "Uploading..." : "Start AI Interview"}
      </button>
    </div>
  );
};

export default MernStack;
