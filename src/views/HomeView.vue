<template>
  <div class="home">
    <h1>Home Page</h1>
    <router-link to="/reserve/new"><b-button class="active">Reserve New</b-button></router-link>
    <router-link to="/reserve/edit"><b-button class="active">See Reserved</b-button></router-link>
    <about/>
    <leaderboard v-if="loggedIn" />
  </div>
</template>

<script>

import Leaderboard from './Leaderboard.vue';
import About from './AboutView.vue';

export default {
  name: 'home',
  components: {
    Leaderboard,
    About,
  },
  data: () => ({
    loggedIn: true,
  }),
};
</script>

<style scoped>
.individual-button {
  margin-top: 3em;
  margin-bottom: 3em;
}

button {
  position: relative;
  top: 30%;
  box-sizing: border-box;
  padding: 0 1em;
  font-size: 100%;
  font-weight: bold;
  background-color: #9AC356;
}

.active {
  border: 2px solid #D4EDAA;
  border-radius: 100px;
}
</style>
