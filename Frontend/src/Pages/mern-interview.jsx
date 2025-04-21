import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./mern-interview.css";

const InterviewPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingText, setRecordingText] = useState("");

  const webcamRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const questions = [
    "Hello, this is Jenny. How are you?",
    "Can you start by introducing yourself and walk us through your background and journey into web development?",
    "What made you choose the MERN stack, and how comfortable are you with each part (MongoDB, Express, React, Node.js)?",
    "Can you explain a MERN stack project you’ve built from scratch? What was the goal, and how did you approach the backend and frontend development?",
    "How do you handle user authentication and authorization in your MERN projects?",
    "Can you talk about any challenges you’ve faced while working with the MERN stack and how you overcame them?",
    "Tell us about one of your favorite personal or college projects—what made it stand out for you?",
    "Have you participated in any hackathons? What was your role in the team, and what did you learn from the experience?",
    "How do you manage time and collaboration when working on a tight deadline, especially during events like hackathons?",
    "How do you stay updated with the latest web development trends or new technologies in the MERN ecosystem?",
    "Would you like to ask us anything?"
  ];

  // Setup speech recognition only once
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setRecordingText("Listening...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecordingText(transcript);

      setAnswers((prevAnswers) => {
        const updated = [...prevAnswers];
        updated[currentQuestionIndex] = transcript;
        return updated;
      });

      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setRecordingText("Could not understand. Please try again.");
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [currentQuestionIndex]);

  // Function to speak question
  const speakQuestion = (question) => {
    const utterance = new SpeechSynthesisUtterance(question);
    const femaleVoice = window.speechSynthesis.getVoices().find(
      (voice) =>
        voice.name.includes("Female") ||
        voice.name.includes("Google UK English Female") ||
        voice.name.includes("Samantha")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isInterviewStarted) {
      speakQuestion(questions[currentQuestionIndex]);
    }
  }, [isInterviewStarted, currentQuestionIndex]);

  const handleStartInterview = () => {
    setAnswers(new Array(questions.length).fill("")); // initialize answers
    setIsInterviewStarted(true);
  };

  const handleStartRecording = () => {
    setRecordingText("");
    setIsRecording(true);
    recognitionRef.current?.start();
  };

  const handleStopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setRecordingText("");
    } else {
      navigate("/result", {
        state: { questions, answers },
      });
    }
  };

  return (
    <div className="interview-container">
      <h1>MERN Interview Session</h1>

      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 320,
            height: 240,
            facingMode: "user",
          }}
          className="webcam-preview"
        />
      </div>

      <div className="interview-questions">
        {isInterviewStarted ? (
          <>
            <p><strong>Question {currentQuestionIndex + 1}:</strong></p>
            <p>{questions[currentQuestionIndex]}</p>

            <div className="answer-section">
              <p><strong>Your Answer:</strong></p>
              <p>{recordingText}</p>

              {!isRecording ? (
                <button onClick={handleStartRecording} className="start-recording-btn">
                  Start Recording
                </button>
              ) : (
                <button onClick={handleStopRecording} className="stop-recording-btn">
                  Stop Recording
                </button>
              )}
            </div>

            <button onClick={handleNext} className="next-question-btn">
              Next Question
            </button>
          </>
        ) : (
          <button onClick={handleStartInterview} className="start-interview-btn">
            Start Interview
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
