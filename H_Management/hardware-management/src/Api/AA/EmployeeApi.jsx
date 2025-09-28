// src/Api/EmployeeApi.js
import axios from "axios";

const BASE_URL = "https://hms-back-5gbr.onrender.com/api/v1/employee";

// Get all employees
export const getAllEmployees = async () => {
  return await axios.get(`${BASE_URL}/all`);
};

// Add new employee
export const addEmployee = async (employee) => {
  return await axios.post(`${BASE_URL}/add`, employee);
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};
