import Axios from 'axios';
import Token from './token';

const API_LOGIN = '/api/v1/user/login/';
const API_SIGNUP = '/api/v1/user/signup/';
const API_REFRESH_TOKEN = '/api/v1/user/login/refresh/';
const API_VERIFY_EMAIL = '/api/v1/user/verify/';
const API_REQUEST_PASSWORD_RESET = '/api/v1/user/forgot_password/request';
const API_DO_PASSWORD_RESET = '/api/v1/user/forgot_password/reset';

const to = route => `${process.env.VUE_APP_API_DOMAIN}${route}`;

export const login = async user => Axios.post(to(API_LOGIN), user).then((response) => {
  Token.setAccessToken(response.data.accessToken);
  Token.setRefreshToken(response.data.refreshToken);
});

export const signup = async user => Axios.post(to(API_SIGNUP), user).then((response) => {
  Token.setAccessToken(response.data.accessToken);
  Token.setRefreshToken(response.data.refreshToken);
});

export const logout = async () => Axios.delete(to(API_LOGIN), {
  headers: {
    'X-Refresh-Token': Token.getRefreshToken(),
  },
}).then(() => {
  Token.removeAccessToken();
  Token.removeRefreshToken();
}).catch(() => {
  Token.removeAccessToken();
  Token.removeRefreshToken();
});

export const refresh = async () => Axios.post(to(API_REFRESH_TOKEN), null, {
  headers: {
    'X-Refresh-Token': Token.getRefreshToken(),
  },
}).then((response) => {
  Token.setAccessToken(response.data.freshAccessToken);
}).catch((err) => {
  Token.removeAccessToken();
  Token.removeRefreshToken();
  throw err;
});

export const verifyEmail = async secretKey => Axios.post(to(`${API_VERIFY_EMAIL}${secretKey}`));

export const requestPasswordReset = async body => Axios.post(to(API_REQUEST_PASSWORD_RESET), body);

export const doPasswordReset = async body => Axios.post(to(API_DO_PASSWORD_RESET), body);
