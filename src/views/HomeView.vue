<template>
  <div class="home">
    <h1>Home Page</h1>
    <div>
    <TeamCreation/>
    </div>
  </div>
</template>

<script>

import TeamCreation from './TeamCreation.vue';

export default {
  name: 'home',
  components: {
    TeamCreation,
  },
};
</script>
