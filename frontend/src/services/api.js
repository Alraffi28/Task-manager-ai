import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-ai-wda4.onrender.com/api/tasks"
});

export default API;