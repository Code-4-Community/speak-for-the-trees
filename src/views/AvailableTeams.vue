<template>
  <div class="cont">
      <h1>Available Teams</h1>
      <p class="basicText">You do not currently belong to any team</p>
      <router-link
        v-for="team in teams"
        :to="`/team/${team.id}`"
        :key="team.id">
        <p class="team">
          {{ team.name }}
        </p>
      </router-link>
      <b-button class="create" @click="createTeam">Create New Team</b-button>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';

Vue.use(VueRouter);

export default {
  name: 'availableTeams',
  computed: mapState({
    teams: 'teams',
  }),
  methods: {
    // sends the user to the create team page
    createTeam() {
      this.$router.push('/create');
    },
  },
  mounted() {
    if (this.teams?.length < 1) this.$store.dispatch('getAllTeams');
  },
};
</script>

<style scoped>
.cont {
  width: 100%;
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
  width: 100%;
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
