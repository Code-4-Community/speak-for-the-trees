<template>
  <div class="home">
    <h1>Home Page</h1>
    <div>
    <b-col>
    <b-button href="/map" pill variant="outline-success">Reserve New</b-button>
    </b-col>
    <b-col>
    <b-button href="/current-reservations" pill variant="outline-success">
    Current Reservations</b-button>
    </b-col>
    <b-col>
    <b-button href="/create" pill variant="outline-success">Create Team</b-button>
    </b-col>
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
