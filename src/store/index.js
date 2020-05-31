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
    userTeam: null,
    reservedStreets: [
      { block: 1005, FID: 1 },
      { block: 1004, FID: 2 },
      { block: 4008, FID: 3 },
      { block: 2002, FID: 4 },
    ],
    teams: [],
    allTeamsLeaderboard: [],
    allVolunteersLeaderboard: [],
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
      state.allTeamsLeaderboard = teams;
    },
    setVolunteersLeaderboard(state, { individuals }) {
      state.allVolunteersLeaderboard = individuals;
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
      if (tokenService.getTeamID() >= 0) {
        getTeam(tokenService.getTeamID()).then((response) => {
          commit('setUserTeam', response.data);
        });
      }
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
