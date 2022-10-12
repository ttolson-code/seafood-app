import axios from 'axios';

// Create instance of axios.
export default axios.create({
  // URL of backend API server.
  baseURL: process.env.REACT_APP_API_SERVER_BASE_URL,
});
