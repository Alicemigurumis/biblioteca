import axios from 'axios';
import { Media } from '../types';

const API_BASE_URL = '';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchMedia = async (mediaType: string, query: string, page: number = 1) => {
  const response = await api.get(`/api/search/${mediaType}`, {
    params: { query, page }
  });
  return response.data;
};

export const getMediaDetails = async (mediaType: string, id: string) => {
  const response = await api.get(`/api/media/${mediaType}/${id}`);
  return response.data;
};

export const saveReview = async (mediaId: string, reviewData: {
  rating: number;
  reviewText: string;
  tags: string[];
}) => {
  const response = await api.post(`/api/reviews/${mediaId}`, reviewData);
  return response.data;
};

export default api;