import type { User, UserFormData } from "@/types/user"
// import { mockUsers } from "./mock-data"
import axios from 'axios';

const isProduction = process.env.NEXT_NODE_ENV === 'production';
// console.log(isProduction,process.env.NEXT_PUBLIC_API_URL);

const isHttps = Boolean(process.env['NX_ON_HTTPS']);

let baseURL;


if (isHttps) {
  baseURL = isProduction ? `https://${process.env.NEXT_PUBLIC_API_URL}/api/users` : 'http://localhost:5000/api/users';
}
if (!isHttps) {
  baseURL = isProduction ? `http://${process.env.NEXT_PUBLIC_API_URL}/api/users` : 'http://localhost:5000/api/users';
}
console.log(baseURL);

const Axios = axios.create({
  baseURL,
});


export async function getUsers(): Promise<User[]> {
  const response = await Axios.get('/')
  return response.data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await Axios.get(`/${id}`);
  
  const user = response.data
  if (user?.message) throw new Error("User not found")
  return user
}

export async function createUser(data: UserFormData): Promise<User> {
  const response = await Axios.post(`/`, data);
  if (response.data?.message) throw new Error(response.data?.message)
  return response.data
}

export async function updateUser(id: string, data: UserFormData): Promise<User> {
  const response = await Axios.put(`/${id}`, data);
  const res = response.data
  if (res?.message) throw new Error("User not found")
  return res
}

export async function deleteUser(id: string): Promise<void> {
  const response = await Axios.delete(`/${id}`);
  if (response.data?.message) throw new Error("User not found")
}

