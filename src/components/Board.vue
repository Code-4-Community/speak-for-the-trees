<template>
  <div>
      <b-row id="header">
        <b-col class="rank" cols="3">Rank</b-col>
        <b-col cols="5">Name</b-col>
        <b-col class="points" cols="4">Blocks Completed</b-col>
      </b-row>
      <b-row
      v-for="individual in individualsWithRank"
      :key="individual.rank"
      :individual="individual">
        <b-col class="rank" cols="3">{{ individual.rank }}</b-col>
        <b-col cols="5">{{ individual.name }}</b-col>
        <b-col class="points" cols="4">{{ individual.blocksCompleted }}</b-col>
      </b-row>
      <h3 v-if="individualsWithRank.length <= 0">
        There's no leaderboard quite yet, check back soon!
      </h3>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    individuals: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // creates a copy of the individuals array and adds a rank
    individualsWithRank() {
      const copy = [...this.individuals];
      copy.sort((a, b) => a.blocksCompleted < b.blocksCompleted);
      return copy.map((element, index) => ({
        ...element,
        name: element.name || element.username,
        blocksCompleted: element.blocksCompleted,
        rank: index + 1,
      }));
    },
  },
};
</script>

<style scoped lang="less">
#header {
  background: #9AC356 !important;
  border: none !important;
  .points {
    padding: 0;
  }
}
.row {
  background: #D4EDAA;
  border-bottom: 1px solid white;
  padding: 0.5rem 0;
  margin: 0;
}
.rank {
  font-weight: bold;
}
.points {
  font-style: italic;
}
</style>
