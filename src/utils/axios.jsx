import axios from 'axios';

// Create a new Axios instance with custom configuration
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json', // Set the content type
  },
});

export default axiosInstance;
