import axios from 'axios';
import tokenService from './token';
import { refresh, logout } from './authAPI';

const AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use((request) => {
  // eslint-disable-next-line
  request.headers['X-Access-Token'] = tokenService.getAccessToken();
  return request;
});

const INVALID_ACCESS_TOKEN = 'Given access token is expired or invalid';

AxiosInstance.interceptors.response.use(
  response => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401
      && error.response.data === INVALID_ACCESS_TOKEN
      && tokenService.isRefreshTokenVaid()) {
      return refresh().then(() => {
        AxiosInstance.defaults.headers['X-Access-Token'] = tokenService.getAccessToken();
        return AxiosInstance(originalRequest);
      });
    } if (error.response.status === 401
      && error.response.data === INVALID_ACCESS_TOKEN
      && !tokenService.isRefreshTokenVaid()) {
      logout();
    } return Promise.reject(error);
  },
);

export default AxiosInstance;
