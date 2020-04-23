<template>
  <div class="home">
    <h1>Home Page</h1>
    <div>
    <b-button-group vertical>
    <b-button class="individual-button" ref="/map" pill variant="outline-success">
    Reserve New</b-button>
    <b-button class="individual-button" href="/current-reservations" pill variant="outline-success">
    Current Reservations</b-button>
    <b-button  class="individual-button" href="/create" pill variant="outline-success">
    Create Team</b-button>
    </b-button-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
};
</script>

<style scoped>
.individual-button {
  margin-top: 3em;
  margin-bottom: 3em;
}
</style>
