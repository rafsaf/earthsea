import axios from "axios";

const local = true;
export const API_IMG = local
  ? "http://localhost:8000"
  : "https://rafsaf2.eu.pythonanywhere.com";
export const API_URL = local
  ? "http://localhost:8000/api/"
  : "https://rafsaf2.eu.pythonanywhere.com/api/";

export const receiveArticle = (slug) =>
  axios.get(`${API_URL}article/${slug}/?format=json`);

export const receiveAllArticles = () =>
  axios.get(`${API_URL}article/?format=json`);

export const receiveHomeArticles = () =>
  axios.get(`${API_URL}article/?format=json&main_page=true`);

export const receiveLatestArticles = () =>
  axios.get(`${API_URL}article/?format=json&latest=true`);

export const receiveArticleVersion = (slug) =>
  axios.get(`${API_URL}article/version/${slug}/?format=json`);

export const likeArticle = (slug) =>
  axios.post(`${API_URL}article/${slug}/like/?format=json`);

export const versionCreate = (slug, text) =>
  axios.post(`${API_URL}version/?format=json`, { slug: slug, text: text });

export const articleCreate = (data) =>
  axios.post(`${API_URL}article/?format=json`, data);
