import axios from "axios";

// Create a pre-configured axios instance for API requests
const apiClient = axios.create({
  baseURL: "https://one01512083-comp3123-assignment2-backend-8pbk.onrender.com/api/v1/", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allow sending cookies if needed
});

// Interceptor runs BEFORE every request → attaches JWT token
apiClient.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("token");
  console.log("TOKEN BEING SENT → ", storedToken);

  // Add Bearer token to headers if available
  if (storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }

  return config;
});

export default apiClient;
