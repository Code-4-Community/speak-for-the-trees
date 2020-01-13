import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reservedStreets: [],
  },
  mutations: {
    addStreetReservation(state, street) {
      state.reservedStreets.push(street);
    },
  },
  actions: {
  },
  modules: {
  },
});
