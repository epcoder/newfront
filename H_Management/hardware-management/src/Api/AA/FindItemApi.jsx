// src/Api/ItemApi.jsx
import axios from "axios";

const API_BASE = "https://hms-back-5gbr.onrender.com/api/v1/item";

// ✅ Get all items
export const getAllItems = async () => {
  return axios.get(`${API_BASE}/getitem`);
};

// ✅ Save a new item
export const saveItem = async (item) => {
  return axios.post(`${API_BASE}/saveItem`, item);
};

// ✅ Update an item
export const updateItem = async (item) => {
  return axios.put(`${API_BASE}/updateItem`, item);
};

// ✅ Delete an item
export const deleteItem = async (item) => {
  return axios.delete(`${API_BASE}/deleteItem`, { data: item });
};

// ✅ Find item by ID
export const findByItemId = async (itemId) => {
  return axios.get(`${API_BASE}/findByItemId/${itemId}`);
};

// ✅ Find item by Name
export const findByItemName = async (itemName) => {
  return axios.get(`${API_BASE}/findByItemName/${itemName}`);
};

// ✅ Find items by Type
export const findByItemType = async (itemType) => {
  return axios.get(`${API_BASE}/findByItemType/${itemType}`);
};

// ✅ Find items by Group
export const findByItemGroup = async (itemGroup) => {
  return axios.get(`${API_BASE}/findByItemGroup/${itemGroup}`);
};

// ✅ Find items by Brand
export const findByItemBrand = async (itemBrand) => {
  return axios.get(`${API_BASE}/findByItemBrand/${itemBrand}`);
};

// ✅ Find items by Supplier
export const findByItemSupplier = async (itemSupplier) => {
  return axios.get(`${API_BASE}/findByItemSupplier/${itemSupplier}`);
};
