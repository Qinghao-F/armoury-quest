import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000
});

export async function getJson<T>(url: string): Promise<T> {
  const response = await apiClient.get<T>(url);
  return response.data;
}
