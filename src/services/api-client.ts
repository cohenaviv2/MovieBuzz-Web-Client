import axios, { CanceledError, AxiosError } from "axios";

export { CanceledError, AxiosError };

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: baseURL,
});

export default apiClient;
