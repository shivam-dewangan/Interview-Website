import React, { useEffect, useState } from "react";
import axios from "axios";

const Get = () => {
  const [analysis, setAnalysis] = useState(null);
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in local storage

  useEffect(() => {
    if (userId) {
      const fetchAnalysis = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/api/get-resume-analysis/${userId}`);
          setAnalysis(response.data.analysis);
        } catch (error) {
          console.error("Error fetching analysis:", error);
        }
      };

      fetchAnalysis();
    }
  }, [userId]);

  if (!analysis) {
    return <div>Loading analysis...</div>;
  }

  return (
    <div>
      <h2>Resume Analysis Results</h2>
      <div>
        <strong>Skills:</strong>
        <ul>
          {analysis.skills && analysis.skills.map((skill, index) => <li key={index}>{skill}</li>)}
        </ul>
      </div>
      <div>
        <strong>Projects:</strong>
        <ul>
          {analysis.projects && analysis.projects.map((project, index) => <li key={index}>{project}</li>)}
        </ul>
      </div>
      <div>
        <strong>Internships:</strong>
        <ul>
          {analysis.internships && analysis.internships.map((internship, index) => <li key={index}>{internship}</li>)}
        </ul>
      </div>
      <div>
        <strong>Hackathons:</strong>
        <ul>
          {analysis.hackathons && analysis.hackathons.map((hackathon, index) => <li key={index}>{hackathon}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Get;
