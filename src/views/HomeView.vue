<template>
  <div class="home">
    <h1>Welcome back, {{ this.username }}!</h1>
    <b-button-group vertical>
      <b-button @click="toNewReservations">New Reservations</b-button>
      <b-button @click="toCurrentReservations">Current Reservations</b-button>
      <b-button @click="toTeams">View Teams</b-button>
    </b-button-group>
    <router-link class="trophy" to="/leaderboard">
      <img src="../assets/trophy.svg" alt="trophy">
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default {
  name: 'home',
  data() {
    return {
      username: 'Betty',
    };
  },
  methods: {
    // sends to the user to the map to make a reservation
    toNewReservations() {
      this.$router.push('/map');
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
