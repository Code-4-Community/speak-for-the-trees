<template>
  <div>
      <div
      class="individual"
      v-for="individual in individualsWithRank"
      :key="individual.rank"
      :individual="individual">
        <p class="rank">{{ individual.rank }}</p>
        <p class="name">{{ individual.name }}</p>
        <p class="points">{{ individual.blocksCompleted }}</p>
      </div>
      <h3 v-if="individualsWithRank.length < 1">
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
.individual {
    display: flex;
    background: #D4EDAA;
    padding: 0.5rem 0 0.5rem 0;
    border-bottom: 1px solid white;
    .rank {
        font-weight: bold;
        margin: 0 0 0 8%;
    }
    .name {
        margin: 0 auto 0 15%;
    }
    .points {
        font-style: italic;
        margin: 0 15% 0 auto;
    }
}
</style>
