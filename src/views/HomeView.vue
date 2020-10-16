<template>
  <div class="home" v-if="isFirstNameLoaded">
    <h1 v-if="firstLogIn">Welcome {{ userData.firstName }}!</h1>
    <h1 v-else>Welcome back, {{ userData.firstName }}!</h1>
    <b-button-group vertical>
      <b-button @click="toNewReservations">New Reservations</b-button>
      <b-button @click="toCurrentReservations">Current Reservations</b-button>
      <b-button @click="toTeams">View Teams</b-button>
    </b-button-group>
    <router-link class="trophy" to="/all-teams-leaderboard">
      <img src="../assets/trophy.svg" alt="trophy">
    </router-link>
  </div>
  <div v-else>
    <h3>Looks like you have been logged out.
      <a href="/login">Click here</a>
      to log back in</h3>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';

Vue.use(VueRouter);

export default {

  name: 'home',

  props: {
    firstLogIn: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  computed: {
    ...mapState({
      userData: 'userData',
    }),

    isFirstNameLoaded() {
      return !!this.userData.firstName;
    },
  },

  methods: {

    // sends to the user to the map to make a reservation
    toNewReservations() {
      this.$router.push('/reserve/new');
    },

    // sends the user to their current reservations
    toCurrentReservations() {
      this.$router.push('/current-reservations');
    },

    // sends the teams page, either available teams or their own team page
    toTeams() {
      this.$router.push('/available-teams');
    },
  },
};
</script>

<style scoped>
button {
  background: #9AC554;
  color: white;
  padding: 0.75rem;
  margin-top: 8vh !important;
  border-radius: 5px !important;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
}
.trophy {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>
