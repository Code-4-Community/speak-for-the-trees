import Axios from 'axios';
import Token from './token';

const API_LOGIN = '/api/v1/user/login/';
const API_SIGNUP = '/api/v1/user/signup/';
const API_REFRESH_TOKEN = '/api/v1/user/login/refresh/';

const to = route => `${process.env.VUE_APP_API_DOMAIN}${route}`;

export const login = async user => Axios.post(to(API_LOGIN), user).then((response) => {
  Token.setAccessToken(response?.data?.accessToken);
  Token.setRefreshToken(response?.data?.refreshToken);
}).catch(error => new Error(error));
export const signup = async user => Axios.post(to(API_SIGNUP), user).then((response) => {
  Token.setAccessToken(response?.data?.accessToken);
  Token.setRefreshToken(response?.data?.refreshToken);
}).catch(error => new Error(error));
export const logout = async () => Axios.delete(to(API_LOGIN));
export const refresh = async () => Axios.post(to(API_REFRESH_TOKEN));
