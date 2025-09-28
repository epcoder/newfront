// src/Api/WarrantyApi.jsx
import axios from "axios";

const BASE_URL = "https://hms-back-5gbr.onrender.com/api/v1/warranty";

// Fetch all warranties
export const getAllWarranties = () => {
  return axios.get(`${BASE_URL}/getWarranty/getAll`);
};

// Fetch a warranty by ID
export const getWarrantyById = (id) => {
  return axios.get(`${BASE_URL}/getWarranty/${id}`);
};

// Add a new warranty
export const addWarrantyApi = (data) => {
  return axios.post(`${BASE_URL}/addWarranty`, data);
};

// Update a warranty
export const updateWarrantyApi = (data) => {
  return axios.put(`${BASE_URL}/updateWarranty`, data);
};
