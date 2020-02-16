import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [
      {
        id: 0,
        name: 'Event 0',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['robinsons'],
        img: 'https://i0.wp.com/www.skillings.com/wp-content/uploads/2017/02/placeholder-square.jpg',
      },
      {
        id: 1,
        name: 'Event 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['robinsons', 'reaves'],
        img: 'https://i0.wp.com/www.skillings.com/wp-content/uploads/2017/02/placeholder-square.jpg',
      },
      {
        id: 2,
        name: 'Event 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['reaves'],
        img: 'https://i0.wp.com/www.skillings.com/wp-content/uploads/2017/02/placeholder-square.jpg',
      },
      {
        id: 3,
        name: 'Event 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['robinsons'],
        img: 'https://i0.wp.com/www.skillings.com/wp-content/uploads/2017/02/placeholder-square.jpg',
      },
      {
        id: 4,
        name: 'Event 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['reaves', 'robinsons'],
      },
      {
        id: 5,
        name: 'Event 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['robinsons'],
      },
      {
        id: 6,
        name: 'Event 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['reaves', 'robinsons'],
      },
      {
        id: 7,
        name: 'Event 7',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['reaves'],
      },
      {
        id: 8,
        name: 'Event 8',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['robinsons', 'reaves'],
      },
      {
        id: 9,
        name: 'Event 9',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['reaves'],
      },
      {
        id: 10,
        name: 'Event 10',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['reaves'],
      },
      {
        id: 11,
        name: 'Event 11',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a',
        users: ['reaves', 'robinsons'],
      },
    ],
  },
  mutations: {
    addStreetReservation(state, street) {
      state.events.push(street);
    },
  },
  getters: {
    doneTodos: state => state.events,
  },
  actions: {
    addStreetReservation(context) {
      this.$store.commit('increment', context);
    },
  },
  modules: {
  },
});
