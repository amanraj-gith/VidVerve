// utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend.vercel.app/api';

export const fetchFeaturedVideos = async () => {
  const response = await fetch(`${API_BASE_URL}/videos/featured`);
  return response.json();
};