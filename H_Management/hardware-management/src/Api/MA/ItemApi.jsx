// src/api/itemApi.js
import axios from "axios";

const BASE_URL = "https://hms-back-5gbr.onrender.com/api/v1/item";

// GET all items
export const getItems = async () => {
  return await axios.get(`${BASE_URL}/getitem`);
};

// ADD new item
export const addItemApi = async (item) => {
  return await axios.post(`${BASE_URL}/saveItem`, item);
};

// UPDATE item
export const updateItemApi = async (item) => {
  return await axios.put(`${BASE_URL}/updateItem`, item);
};

// DELETE item
export const deleteItemApi = async (item) => {
  return await axios.delete(`${BASE_URL}/deleteItem`, { data: item });
};
