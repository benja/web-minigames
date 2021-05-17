import axios from 'axios';

export const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  // withCredentials: true,
});

export async function swrFetcher<Body>(url: string) {
  return (await API.get<Body>(url)).data;
}
