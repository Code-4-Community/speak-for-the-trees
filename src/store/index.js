import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    streets: [
      {
        id: 0,
        name: 'Street 1',
      },
      {
        id: 1,
        name: 'Street 2',
      },
    ],
  },
  mutations: {
    addStreet(state, street) {
      state.streets = state.streets.push(street);
    },
    removeStreet(state, id) {
      state.streets = state.streets.filter(street => street.id !== id);
    },
  },
  getters: {
    getStreets: state => state.streets,
  },
  actions: {
  },
  modules: {
  },
});
