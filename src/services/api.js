import axios from 'axios';

const api = axios.create({
  baseURL: 'https://criar.me/wp-json/discount-partner/v1/api',
});

export default api;
