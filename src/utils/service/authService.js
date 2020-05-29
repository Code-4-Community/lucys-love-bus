/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import jwtUtils from '../auth/jwtUtils';
import authApi from '../../api/authApi';
import userState from '../auth/state/userState';
import tokenService from '../auth/tokenService';


const actions = {
  /**
   * Called in Login.vue
   * Used to login the user and retrieve access & refresh tokens.
   * @param {*} user object containing {username, password, rememberMe} properties.
   */
  async login(user) {
    const response = await authApi.login(user);
    if (response.status === 201) {
      userState.login(response.data.accessToken, response.data.refreshToken);
    } else if (response.status === 401) {
      throw new Error('Incorrect email/password combination');
    } else {
      throw new Error(`Login failed with response status ${response.status}`);
    }
  },
  /**
   * Called in SignUp.vue
   * Used to sign a user up and retrieve access & refresh tokens.
   * @param {*} user object containing {firstName, lastName, password, email} properties.
   */
  async signup(user) {
    const response = await authApi.signup(user);
    if (response.status === 201) {
      userState.login(response.data.accessToken, response.data.refreshToken);
    } else if (response.status === 409) {
      // TODO: pretty sure this will never be hit because the signup would throw an exception
      throw new Error('Email is already in use');
    } else {
      throw new Error(`Signup failed with response status ${response.status}`);
    }
  },
  /**
   * Used to logout the current user. Sends access & refresh tokens to backend for invalidation.
   * Removes access and refresh token headers from axios.
   * Calls logout from userState Singleton.
   */
  async logout() {
    try {
      const response = await authApi.logout(tokenService.getRefreshToken());
      authApi.deleteAccessTokenHeader();
      authApi.deleteRefreshTokenHeader();
      userState.logout();
      if (response.status !== 204) {
        throw new Error(`Logout failed with response status ${response.status}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      // console.log(error);
    }
  },
  /**
   * Used in App.vue beforeCreate lifecycle hook. Used to persist the user without
   * having them login again.
   */
  async persistUser() {
    const access = tokenService.getAccessToken();
    const refresh = tokenService.getRefreshToken();
    // attempt a refresh if the access is invalid but the refresh is valid.
    if (!jwtUtils.isJWTValid(access) && jwtUtils.isJWTValid(refresh)) {
      try {
        const response = await authApi.refresh(refresh);
        if (response.status === 201) {
          userState.login(response.data.accessToken, refresh);
        } else {
          userState.logout();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    // login if both are valid.
    } else if (jwtUtils.isJWTValid(access) && jwtUtils.isJWTValid(refresh)) {
      userState.login(access, refresh);
    }
  },
};

export default {
  actions,
};
