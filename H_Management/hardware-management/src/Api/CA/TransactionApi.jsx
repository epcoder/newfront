import axios from "axios";

const API_URL = "https://hms-back-5gbr.onrender.com/api/v1/cashiertransaction";

// Save a new transaction
export const saveTransaction = async (transactionData) => {
  return await axios.post(`${API_URL}/save`, transactionData);
};

// Get all transactions
export const getAllTransactions = async () => {
  return await axios.get(`${API_URL}/all`);
};

// Get transaction by transactionId
export const getTransactionById = async (transactionId) => {
  return await axios.get(`${API_URL}/transactionId/${transactionId}`);
};