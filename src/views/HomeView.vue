<template>
  <div>
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
</style>
