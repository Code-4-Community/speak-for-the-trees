import Vue from 'vue';
import Vuex from 'vuex';
import tokenService from '../auth/token';
import { getAllTeams } from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserAuthenticated: false,
    privilegeLevel: -1,
    reservedStreets: [
      { name: 'Forsyth', type: 'ST', FID: 19079 },
      { name: 'Hemenway', type: 'ST', FID: 14494 },
      { name: 'Hunington', type: 'BLVD', FID: 19078 },
      { name: 'Parker', type: 'AVE', FID: 16373 },
    ],
    teams: [],
  },
  getters: {
    GET_RESERVED_STREETS: state => state.reservedStreets,
  },
  mutations: {
    setUser(state) {
      state.isUserAuthenticated = !!(tokenService.getPrivilegeLevel() > -1);
      state.privilegeLevel = tokenService.getPrivilegeLevel();
    },
    setAllTeams(state, { teams }) {
      state.teams = [...state.teams, ...teams];
    },
  },
  actions: {
    async getAllTeams({ commit }) {
      getAllTeams().then((response) => {
        commit('setAllTeams', response.data);
      });
    },
  },
  modules: {
  },
});
