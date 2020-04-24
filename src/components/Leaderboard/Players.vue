<template>
    <div class="rows">
        <div class="row" v-for="team in players" :key="team.rank">
          <p class="rank">{{ team.rank }}</p>
          <p class="name">{{ team.team_name }}</p>
          <p class="points">{{ team.points }}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'players',
  data: () => ({
    players: [
      { rank: 1, team_name: 'KFC', points: '25' },
      { rank: 2, team_name: 'McDonalds', points: '22' },
      { rank: 3, team_name: 'Chipotle', points: '20' },
      { rank: 4, team_name: 'Burger King', points: '14' },
    ],
  }),
};
</script>

<style scoped lang="less">
.rows {
   padding-top: 7vh;
}

.row {
  display: flex;
  border-bottom: 1px solid #9AC356;
  .rank {
    font-weight: bold;
    margin: 2em 0 2em 12%;
  }
  .name {
    margin: 2em auto 2em 20%;
  }
  .points {
    font-style: italic;
    margin: 2em 12% 2em auto;
  }
}

.row:last-child {
  border: none;
}
</style>
