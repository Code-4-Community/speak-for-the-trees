import Vue from 'vue';
import Vuex from 'vuex';
import tokenService from '../auth/token';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserAuthenticated: false,
    privilegeLevel: -1,
  },
  mutations: {
    setUser(state) {
      state.isUserAuthenticated = !!(tokenService.getPrivilegeLevel() > -1);
      state.privilegeLevel = tokenService.getPrivilegeLevel();
    },
  },
  actions: {
  },
  modules: {
  },
});
