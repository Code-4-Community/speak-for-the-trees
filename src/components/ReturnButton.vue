<template>
  <button class="return-btn" v-on:click="this.go">
    <img class="return-btn" src="../assets/left-arrow.svg" alt="actions" />
  </button>
</template>

<script>
export default {
  name: 'return-button',
  props: {
    path: {
      required: false,
      type: Object,
    },
  },
  methods: {
    go() {
      if (!this.path) {
        this.$router.back();
      } else {
        this.$router.push(this.path);
      }
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
