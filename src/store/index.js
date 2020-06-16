import Vue from 'vue';
import Vuex from 'vuex';
import tokenService from '../auth/token';
import {
  getAllTeams, getBlocksLeaderboard, getUserData, getReservedBlocks, getReservedBlocksAdmin,
  getCompletedBlocksAdmin,
} from '../api/api';

Vue.use(Vuex);

const getDefaultState = () => ({
  isUserAuthenticated: false,
  privilegeLevel: -1,
  userData: {},
  teams: [],
  allTeamsLeaderboard: [],
  allVolunteersLeaderboard: [],
  reservedBlocks: [],
  allReservedBlocks: [],
  allCompletedBlocks: [],
});

// initial state
const appState = getDefaultState();

export default new Vuex.Store({
  state: appState,
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    setUser(state) {
      state.isUserAuthenticated = !!(tokenService.getPrivilegeLevel() > -1);
      state.privilegeLevel = tokenService.getPrivilegeLevel();
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
    setReservedBlocksAdmin(state, blockData) {
      state.allReservedBlocks = blockData;
    },
    setCompletedBlocksAdmin(state, blockData) {
      state.allCompletedBlocks = blockData;
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
    async getReservedBlocksAdmin({ commit }) {
      getReservedBlocksAdmin().then((response) => {
        commit('setReservedBlocksAdmin', response.data);
      });
    },
    async getCompletedBlocksAdmin({ commit }) {
      getCompletedBlocksAdmin().then((response) => {
        commit('setCompletedBlocksAdmin', response.data);
      });
    },
  },
  modules: {
  },
});
