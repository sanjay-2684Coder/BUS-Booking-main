import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://192.168.175.136:8080', // Base URL for your backend API
  withCredentials: true, // Allow cookies for cross-origin requests
  timeout: 50000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Set default content type globally
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Skip authentication logic if `skipAuth` flag is true
    if (config.skipAuth) {
      return config;
    }

    // Attach JWT token to the Authorization header (if available)
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        console.error("Unauthorized Access - Redirecting to login.");
        localStorage.removeItem("jwtToken");
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error(`Response Error: ${response.status} - ${response.statusText}`);
      }
    } else {
      console.error("Network Error or Timeout - Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
