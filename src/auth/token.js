const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';


/**
 * Returns a JWT Payload from localstorage OR falsy value if there is no valid token
 * @param {String} key one of ACCESS_TOKEN_KEY or REFRESH_TOKEN_KEY
 */
const getTokenPayload = (key) => {
  const payload = JSON.parse(atob(localStorage.getItem(key).split('.')[1]));
  return payload !== null && Math.round(Date.now() / 1000) < payload.exp && payload;
};

const tokenService = {
  getAccessToken() {
    return getTokenPayload(ACCESS_TOKEN_KEY) && localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  },
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken() {
    return getTokenPayload(REFRESH_TOKEN_KEY) && localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  getPrivilegeLevel() {
    try {
      const payload = getTokenPayload(ACCESS_TOKEN_KEY);
      return payload.privilegeLevel;
    } catch (e) {
      return -1;
    }
  },
  getUserID() {
    try {
      const payload = getTokenPayload(ACCESS_TOKEN_KEY);
      return payload.userId;
    } catch (e) {
      return -1;
    }
  },
  getTeamID() {
    try {
      const payload = getTokenPayload(ACCESS_TOKEN_KEY);
      return payload.teamId;
    } catch (e) {
      return -1;
    }
  },
};

export default tokenService;
