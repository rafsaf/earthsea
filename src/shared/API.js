import axios from "axios";

export const API_IMG = "http://localhost:8000";
export const API_URL = "http://localhost:8000/api/";

export const receiveArticle = (slug) =>
  axios.get(`${API_URL}article/${slug}/?format=json`);

export const receiveAllArticles = () =>
  axios.get(`${API_URL}articles/?format=json`);

export const receiveHomeArticles = () =>
  axios.get(`${API_URL}articles/?format=json&main_page=true`);

export const receiveLatestArticles = () =>
  axios.get(`${API_URL}articles/?format=json&latest=true`);

export const receiveArticleVersion = (slug) =>
  axios.get(`${API_URL}article/version/${slug}/?format=json`);

export const likeArticle = (slug) =>
  axios.post(`${API_URL}article/${slug}/like/?format=json`);

export const versionCreate = (slug, text) =>
  axios.post(`${API_URL}version/?format=json`, { slug: slug, text: text });
