// src/Api/UserApi.jsx
import axios from "axios";

const API_URL = "https://hms-back-5gbr.onrender.com/api/v1/user"; // ✅ Adjust if backend runs on another port or domain

// Save new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
