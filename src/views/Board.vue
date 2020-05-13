<template>
  <div>
      <div
      class="individual"
      v-for="individual in individuals_with_ranking"
      :key="individual.rank"
      :individual="individual">
        <p class="rank">{{ individual.rank }}</p>
        <p class="name">{{ individual.username }}</p>
        <p class="points">{{ individual.blocksCompleted }}</p>
      </div>
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
    individuals_with_ranking() {
      const result = [];

      let i = 0;

      while (i < this.individuals.length) {
        result.push({
          rank: i + 1,
          username: this.individuals[i].username,
          blocksCompleted: this.individuals[i].blocksCompleted,
        });
        i += 1;
      }
      return result;
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
