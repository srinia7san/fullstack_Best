import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const analyzeContractText = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contracts/analyze`, text, {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing contract:', error);
    throw error;
  }
};

export const uploadContractPdf = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_BASE_URL}/contracts/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

export const getAllContracts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contracts`);
    return response.data;
  } catch (error) {
    console.error('Error getting contracts:', error);
    throw error;
  }
};