import axios from 'axios';
import { Media } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchMedia = async (mediaType: string, query: string, page: number = 1) => {
  const response = await api.get(`/search/${mediaType}`, {
    params: { query, page }
  });
  return response.data;
};

export const getMediaDetails = async (mediaType: string, id: string) => {
  const response = await api.get(`/media/${mediaType}/${id}`);
  return response.data;
};

export const saveReview = async (mediaId: string, reviewData: {
  rating: number;
  reviewText: string;
  tags: string[];
}) => {
  const response = await api.post(`/reviews/${mediaId}`, reviewData);
  return response.data;
};

export default api;