<template>
  <button v-on:click="this.return">Go Back</button>
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

</style>
