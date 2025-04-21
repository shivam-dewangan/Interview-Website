import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import MernStack from "./Pages/MernStack.jsx";
import AiMl from "./Pages/AiMl.jsx";
import DataAnalytics from "./Pages/DataAnalytics.jsx";
import EthicalHacking from "./Pages/EthicalHacking.jsx";
import Cybersecurity from "./Pages/Cybersecurity.jsx";
import FullStack from "./Pages/Aws.jsx";
import MernInt from "./Pages/mern-interview.jsx";
import ResultPage from "./Pages/ ResultPage.jsx";

import "./App.css";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mern-stack" element={<MernStack />} />
        <Route path="/ai-ml" element={<AiMl />} />
        <Route path="/data-analytics" element={<DataAnalytics />} />
        <Route path="/ethical-hacking" element={<EthicalHacking />} />
        <Route path="/cybersecurity" element={<Cybersecurity />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/aws" element={<FullStack />} />
        <Route path="/mern-interview-session" element={<MernInt/>} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
