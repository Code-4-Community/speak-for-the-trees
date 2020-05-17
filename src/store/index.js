import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reservedStreets: [
      { name: 'Forsyth', type: 'ST', FID: 19079 },
      { name: 'Hemenway', type: 'ST', FID: 14494 },
      { name: 'Hunington', type: 'BLVD', FID: 19078 },
      { name: 'Parker', type: 'AVE', FID: 16373 },
    ],
  },
  getters: {
    GET_RESERVED_STREETS: state => state.reservedStreets,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
