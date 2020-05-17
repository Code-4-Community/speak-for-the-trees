import Vue from 'vue';
import Vuex from 'vuex';
import tokenService from '../auth/token';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false,
      privilegeLevel: -1,
    },
  },
  mutations: {
    setUser(state) {
      state.user.isLoggedIn = !!(tokenService.getPrivilegeLevel() > -1);
      state.user.privilegeLevel = tokenService.getPrivilegeLevel();
    },
  },
  actions: {
  },
  modules: {
  },
});
