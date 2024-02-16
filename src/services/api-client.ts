import axios, { CanceledError } from "axios";

export { CanceledError };

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

export default apiClient;
