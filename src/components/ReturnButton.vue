<template>
  <button class="return-btn" v-on:click="this.return">
    <img class="return-btn" src="../assets/left-arrow.svg" alt="actions" />
  </button>
</template>

<script>
export default {
  name: 'return-button',
  methods: {
    return() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.return-btn {
  background: none;
  border: none;
}
</style>
