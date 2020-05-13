<template>
  <div>
    <h1>Volunteer Leaderboard</h1>
    <p>Celebrate all the contributions of our Speak for the Trees volunteers!</p>
    <Board v-bind:individuals="this.individuals" />
  </div>
</template>

<script>
import Board from './Board.vue';

export default {
  name: 'VolunteerLeaderboard',
  components: {
    Board,
  },
  data() {
    return {
      individuals: [
        {
          id: 1,
          username: 'Alpha',
          blocksCompleted: 4,
          blocksReserved: 10,
        },
        {
          id: 2,
          username: 'Beta',
          blocksCompleted: 6,
          blocksReserved: 20,
        },
        {
          id: 3,
          username: 'Charlie',
          blocksCompleted: 5,
          blocksReserved: 5,
        },
        {
          id: 4,
          username: 'Delta',
          blocksCompleted: 23,
          blocksReserved: 40,
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
