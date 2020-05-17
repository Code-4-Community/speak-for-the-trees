const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

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
      const payload = JSON.parse(atob(localStorage.getItem(ACCESS_TOKEN_KEY).split('.')[1]));
      return payload.privilegeLevel;
    } catch (e) {
      return -1;
    }
  },
};

export default tokenService;
