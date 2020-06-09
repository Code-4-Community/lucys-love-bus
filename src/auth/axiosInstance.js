/* eslint-disable no-console */
import axios from 'axios';
import tokenService from './token';
import { refresh } from './authAPI';

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
      && !originalRequest.retry
      && tokenService.getRefreshToken()) {
      originalRequest.retry = true;
      return refresh().finally(() => {
        AxiosInstance.defaults.headers['X-Access-Token'] = tokenService.getAccessToken();
        return AxiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
