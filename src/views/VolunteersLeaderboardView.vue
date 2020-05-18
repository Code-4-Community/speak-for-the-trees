<template>
  <div>
    <h1>Volunteer Leaderboard</h1>
    <p>Celebrate all the contributions of our Speak for the Trees volunteers!</p>
    <Board v-bind:individuals="this.individuals" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Board from '../components/Board.vue';

export default {
  name: 'VolunteerLeaderboard',
  components: {
    Board,
  },
  computed: mapState({
    individuals: 'volunteersLeaderboard',
  }),
  mounted() {
    if (this.individuals.length < 1) this.$store.dispatch('getBlocksLeaderboard');
  },
};
</script>

<style scoped lang="less">
p {
  color: #C4C4C4;
}
</style>
