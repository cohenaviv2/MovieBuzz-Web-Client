import axios, { CanceledError } from "axios";

export { CanceledError };

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

export default apiClient;
