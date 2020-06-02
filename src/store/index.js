import Vue from 'vue';
import Vuex from 'vuex';
import tokenService from '../auth/token';
import {
  getAllTeams, getBlocksLeaderboard, getTeam, getUserData, getReservedBlocks,
} from '../api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isUserAuthenticated: false,
    privilegeLevel: -1,
    userData: {},
    userTeam: null,
    teams: [],
    allTeamsLeaderboard: [],
    allVolunteersLeaderboard: [],
    reservedBlocks: [],
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
    setReservedBlocks(state, blockData) {
      state.reservedBlocks = blockData;
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
    async getReservedBlocks({ commit }) {
      getReservedBlocks().then((response) => {
        commit('setReservedBlocks', response.data);
      });
    },
  },
  modules: {
  },
});
