<template>
  <div>
      <div
      class="team"
      v-for="individual in individuals"
      :key="individual">
        <p class="rank">1</p>
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
};
</script>

<style scoped lang="less">
.team {
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
