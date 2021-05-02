import axios from 'axios';

export const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true
});

export async function swrFetcher<Body>(url: string) {
  return (await API.get<Body>(url)).data;
}
