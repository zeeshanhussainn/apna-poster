import axios from 'axios';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});
