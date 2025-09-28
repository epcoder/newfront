// src/services/itemService.js

import axios from 'axios';

// Base URL for your item API
const BASE_URL = 'http://localhost:8080/api/v1/item';

// Get all items
export const getItems = () => {
  return axios.get(`${BASE_URL}/getitem`);
};

// Add a new item
export const addItem = (item) => {
  return axios.post(`${BASE_URL}/add`, item);
};
