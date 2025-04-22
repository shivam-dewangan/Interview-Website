import axios from "axios";

const API_URL = "https://interview-website-n3ge.onrender.com/api/auth";

// Signup function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // returns the data from the signup API
  } catch (error) {
    console.error("Error during signup:", error.response ? error.response.data : error.message);
    throw error; // Rethrow to handle it in the calling component
  }
};

// Login function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // returns the data from the login API (typically token, user info, etc.)
  } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : error.message);
    throw error; // Rethrow to handle it in the calling component
  }
};
