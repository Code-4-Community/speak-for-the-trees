<template>
  <div class="cont">
      <h1>Available Teams</h1>
      <p class="basicText">You do not currently belong to any team</p>
      <router-link
      :to="{ name: 'TeamView' }"
      v-for="team in teams"
      :key="team">
        <p class="team">{{ team.name }}</p>
      </router-link>
      <b-button class="create" @click="createTeam">Create New Team</b-button>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default {
  name: 'availableTeams',
  data() {
    return {
      teams: [
        {
          id: 1,
          name: 'team1',
          memberCount: 5,
        },
        {
          id: 2,
          name: 'team2',
          memberCount: 5,
        },
        {
          id: 3,
          name: 'team3',
          memberCount: 5,
        },
        {
          id: 4,
          name: 'team4',
          memberCount: 5,
        },
        {
          id: 5,
          name: 'team5',
          memberCount: 5,
        },
      ],
    };
  },
  methods: {
    // sends the user to the create team page
    createTeam() {
      this.$router.push('/create');
    },
  },
};
</script>

<style scoped>
.cont {
  width: 100vw;
}

.basicText {
  color: #C4C4C4;
}

.team {
  color: black;
  background: #9AC356;
  font-size: 14px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  align-self: left;
  width: 95vw;
}

button.create, button.create:hover, button.create:focus {
  background: #9AC356;
  color: white;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  margin: 1rem 5vw 0 0;
  float: right;
}
</style>
