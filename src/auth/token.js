const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';


/**
 * Returns a JWT Payload from localstorage OR falsy value if there is no valid token
 * @param {String} key one of ACCESS_TOKEN_KEY or REFRESH_TOKEN_KEY
 */
const getTokenPayload = (key) => {
  const token = localStorage.getItem(key);
  if (!token) return false;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload !== null && payload;
};

const tokenService = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  },
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
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
      if (!payload) return -1;
      if (payload.privilegeLevel === 0) return 0;
      return payload.privilegeLevel || -1;
    } catch (e) {
      return -1;
    }
  },
  getUserID() {
    try {
      const payload = getTokenPayload(ACCESS_TOKEN_KEY);
      return payload.userId || -1;
    } catch (e) {
      return -1;
    }
  },
  isRefreshTokenVaid() {
    const payload = getTokenPayload(REFRESH_TOKEN_KEY);
    return payload && Math.round(Date.now() / 1000) < payload.exp;
  },
};

export default tokenService;
