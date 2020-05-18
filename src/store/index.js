import Vue from 'vue';
import Vuex from 'vuex';
import tokenService from '../auth/token';
import {
  getAllTeams, getBlocksLeaderboard, getTeam, getUserData,
} from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserAuthenticated: false,
    privilegeLevel: -1,
    userData: {},
    userTeam: {},
    reservedStreets: [
      { name: 'Forsyth', type: 'ST', FID: 19079 },
      { name: 'Hemenway', type: 'ST', FID: 14494 },
      { name: 'Hunington', type: 'BLVD', FID: 19078 },
      { name: 'Parker', type: 'AVE', FID: 16373 },
    ],
    teams: [],
    teamsLeaderboard: [],
    volunteersLeaderboard: [],
  },
  getters: {
    GET_RESERVED_STREETS: state => state.reservedStreets,
  },
  mutations: {
    setUser(state) {
      state.isUserAuthenticated = !!(tokenService.getPrivilegeLevel() > -1);
      state.privilegeLevel = tokenService.getPrivilegeLevel();
    },
    setUserTeam(state, userTeam) {
      state.userTeam = userTeam;
    },
    setAllTeams(state, { teams }) {
      state.teams = teams;
    },
    setTeamsLeaderboard(state, { teams }) {
      state.teamsLeaderboard = teams;
    },
    setVolunteersLeaderboard(state, { individuals }) {
      state.volunteersLeaderboard = individuals;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
  },
  actions: {
    async getAllTeams({ commit }) {
      getAllTeams().then((response) => {
        commit('setAllTeams', response.data);
      });
    },
    async getBlocksLeaderboard({ commit }) {
      getBlocksLeaderboard().then((response) => {
        commit('setTeamsLeaderboard', response.data);
        commit('setVolunteersLeaderboard', response.data);
      });
    },
    async getUserTeam({ commit }) {
      getTeam(tokenService.getTeamID()).then((response) => {
        commit('setUserTeam', response.data);
      });
    },
    async getUserData({ commit }) {
      getUserData().then((response) => {
        commit('setUserData', response.data);
      });
    },
  },
  modules: {
  },
});
