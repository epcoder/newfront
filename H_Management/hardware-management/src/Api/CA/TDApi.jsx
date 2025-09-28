// src/Api/CA/TransactionApi.jsx
import axios from "axios";

// Use your local backend for development
const BASE_URL = "http://localhost:8080/api/v1/cashiertransaction";

/**
 * Fetch all transactions
 */
export const getAllTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data; // returns array
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

/**
 * Fetch transaction by ID
 */
export const getTransactionById = async (transactionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactionId/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transaction ${transactionId}:`, error);
    throw error;
  }
};

/**
 * Save new transaction
 */
export const saveTransaction = async (transaction) => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, transaction);
    return response.data;
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw error;
  }
};
