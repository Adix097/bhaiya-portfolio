// const BASE = `${import.meta.env.VITE_API_URL}/api`;
const BASE = `https://bhaiya-portfolio-987480429330.asia-south1.run.app/api`;

const get = async (path) => {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
};

// export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL = "https://bhaiya-portfolio-987480429330.asia-south1.run.app";

export const getCollections = () => get("/collections");
export const getCollection = (slug) => get(`/collections/${slug}`);
export const getProjects = () => get("/projects");
export const getProject = (slug) => get(`/projects/${slug}`);
