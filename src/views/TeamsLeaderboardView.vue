<template>
  <div>
    <h1>Team Leaderboard</h1>
    <p>Celebrate your team’s progress and view individual member contribution</p>
    <Board v-bind:individuals="this.members" />
  </div>
</template>

<script>
import Board from '../components/Board.vue';

export default {
  name: 'TeamLeaderboard',
  components: {
    Board,
  },
  data() {
    return {
      members: [
        {
          id: 4,
          username: 'Delta',
          blocksCompleted: 23,
          blocksReserved: 40,
          teamRole: 2,
        },
        {
          id: 2,
          username: 'Beta',
          blocksCompleted: 6,
          blocksReserved: 20,
          teamRole: 1,
        },
        {
          id: 3,
          username: 'Charlie',
          blocksCompleted: 5,
          blocksReserved: 5,
          teamRole: 1,
        },
        {
          id: 1,
          username: 'Alpha',
          blocksCompleted: 4,
          blocksReserved: 10,
          teamRole: 1,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
p {
  color: #C4C4C4;
}
</style>
