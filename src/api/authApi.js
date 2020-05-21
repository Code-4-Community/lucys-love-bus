/* eslint-disable camelcase */
import { publicResourceAxios, protectedResourceAxios } from '../utils/auth/axios/axiosInstance';
import {
  API_LOGIN, API_SIGNUP, API_REFRESH_TOKEN,
} from './endpoints';

/**
 * MODULE SUMMARY
 * Used as a wrapper around user authentication api calls. Exposes certain functions that can
 * be looked at as routes. These functions should be called in Vuex Modules.
 *
 * One of these files should be made for every group of api calls (e.g. authApi.js, eventsApi.js)
 */

function setAccessTokenHeader(access_token) {
  protectedResourceAxios.defaults.headers['X-Access-Token'] = access_token;
}

function setRefreshTokenHeader(refresh_token) {
  protectedResourceAxios.defaults.headers['X-Refresh-Token'] = refresh_token;
}

function deleteAccessTokenHeader() {
  delete protectedResourceAxios.defaults.headers['X-Access-Token'];
}

function deleteRefreshTokenHeader() {
  delete protectedResourceAxios.defaults.headers['X-Refresh-Token'];
}

/**
 * Uses publicResourceAxios instance to avoid duplicating requests.
 * @param {Object} user contains fields username, password, and rememberMe.
 * Makes a request to the backend api.
 */
function login(user) {
  return publicResourceAxios.post(API_LOGIN, user);
}

function verifyEmail(secretKey) {
  return publicResourceAxios.post(`/api/v1/user/verify/${secretKey}`);
}

function requestPasswordReset(body) {
  return publicResourceAxios.post('/api/v1/user/forgot_password/request', body);
}

function doPasswordReset(body) {
  return publicResourceAxios.post('/api/v1/user/forgot_password/reset', body);
}

/**
 * @param {Object} user contains fields username, password, firstName, and lastName
 * Makes a request to the backend api.
 */
function signup(user) {
  return protectedResourceAxios.post(API_SIGNUP, user);
}

function logout(refresh_token) {
  setRefreshTokenHeader(refresh_token);
  return protectedResourceAxios.delete(API_LOGIN);
}

function refresh(refresh_token) {
  setRefreshTokenHeader(refresh_token);
  return protectedResourceAxios.post(API_REFRESH_TOKEN);
}


export default {
  login,
  signup,
  logout,
  refresh,
  verifyEmail,
  requestPasswordReset,
  doPasswordReset,
  setAccessTokenHeader,
  setRefreshTokenHeader,
  deleteAccessTokenHeader,
  deleteRefreshTokenHeader,
};
