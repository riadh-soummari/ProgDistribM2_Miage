// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre backend

export const getAllData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const createData = async (data) => {
  try {
    await axios.post(`${BASE_URL}/data`, data);
  } catch (error) {
    console.error('Error creating data:', error);
  }
};
