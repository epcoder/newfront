import axios from "axios";

const API_URL = "https://hms-back-5gbr.onrender.com/api/v1/customers"; // adjust if needed

// Get all customers
export const getAllCustomers = async () => {
  return await axios.get(API_URL);
};

// Get customer by ID
export const getCustomerById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create a new customer
export const createCustomer = async (customerData) => {
  return await axios.post(API_URL, customerData);
};

// Update an existing customer
export const updateCustomer = async (id, customerData) => {
  return await axios.put(`${API_URL}/${id}`, customerData);
};

// Delete customer
export const deleteCustomer = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};