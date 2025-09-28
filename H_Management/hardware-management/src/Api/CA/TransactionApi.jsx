// src/api/transactionApi.js
import axios from "axios";

const BASE_URL = "https://hms-back-5gbr.onrender.com/api/v1/cashiertransaction";

export const saveTransaction = async (transaction) => axios.post(`${BASE_URL}/save`, transaction);
export const getAllTransactions = async () => axios.get(`${BASE_URL}/all`);
