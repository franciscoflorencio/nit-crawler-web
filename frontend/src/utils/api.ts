import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // URL do backend

export const fetchArticles = async () => {
  const response = await axios.get(`${BASE_URL}/articles/`);
  return response.data;
};

export const fetchProjects = async () => {
  const response = await axios.get(`${BASE_URL}/projects/`);
  return response.data;
};

export const fetchProjectById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/projects/${id}/`);
  return response.data;
};
