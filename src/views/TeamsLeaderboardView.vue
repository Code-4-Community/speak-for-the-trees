<template>
  <div>
    <h1>Team Leaderboard</h1>
    <p>Celebrate your team’s progress and view individual member contribution</p>
    <Board v-bind:individuals="this.members" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Board from '../components/Board.vue';

export default {
  name: 'TeamLeaderboard',
  components: {
    Board,
  },
  mounted() {
    this.$store.dispatch('getBlocksLeaderboard');
  },
  computed: mapState({
    members: 'teamsLeaderboard',
  }),
};
</script>

<style scoped lang="less">
p {
  color: #C4C4C4;
}
</style>
