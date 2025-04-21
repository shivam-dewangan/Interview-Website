import React from "react";
import { useLocation } from "react-router-dom";
import("./Result.css")
const ResultPage = () => {
  const location = useLocation();
  const { questions, answers } = location.state || { questions: [], answers: [] };

  return (
    <div className="result-container">
      <h1>Interview Results</h1>
      {questions.map((question, index) => (
        <div key={index} className="result-item">
          <p>
            <strong>Question {index + 1}:</strong> {question}
          </p>
          <p>
            <strong>Answer:</strong> {answers[index] || "No answer recorded"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
