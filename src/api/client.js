import axios from "axios";

const client = axios.create({
  baseURL: "https://one01512083-comp3123-assignment2-backend-8pbk.onrender.com/api/v1/", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN BEING SENT → ", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
