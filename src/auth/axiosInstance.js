import axios from 'axios';
import tokenService from './token';

const AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_DOMAIN,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use((request) => {
  // eslint-disable-next-line
  request.headers['X-Access-Token'] = tokenService.getAccessToken();
  return request;
});

export default AxiosInstance;
