import axios from 'axios';

export const marketstackApiKey = import.meta.env.VITE_APP_MARKETWATCH_API_KEY;

export const marketstackApi = axios.create({
  baseURL: 'http://api.marketstack.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    // 'X-Api-Key': import.meta.env.VITE_APP_MARKETWATCH_API_KEY,
  },
});

const createUrl = (url) => {
  return `${url}?access_key=${marketstackApiKey}`;
};

export const getEodLatest = async (symbols) => {
  const url = createUrl('eod/latest');
  const response = await marketstackApi.get(`${url}&symbols=${symbols}`);
  return response.data;
};
