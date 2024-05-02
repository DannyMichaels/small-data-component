import axios from 'axios';

const marketwatchApi = axios.create({
  baseURL: 'https://api.marketwatch.com',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': import.meta.env.VITE_APP_MARKETWATCH_API_KEY,
  },
});
