// src/api/itemApi.js
import axios from "axios";

const BASE_URL = "https://hms-back-5gbr.onrender.com/api/v1/item";

export const getAllItems = async () => axios.get(`${BASE_URL}/getitem`);
export const findByItemName = async (name) => axios.get(`${BASE_URL}/findByItemName/${name}`);

