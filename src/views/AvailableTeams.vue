<template>
  <div class="cont">
    <div>
      <h1>Your Teams</h1>
      <p
          class="basicText"
          v-if="myTeams.length == 0">
        You aren't on a team yet, check out some below!
      </p>
      <router-link
          v-for="team in myTeams"
          :to="`/team/${team.id}`"
          :key="team.id">
        <p class="team">
          {{ team.name }}
        </p>
      </router-link>
    </div>
    <div v-if="pendingTeams.length > 0">
      <h1>Pending Applications</h1>
      <router-link
          v-for="team in pendingTeams"
          :to="`/team/${team.id}`"
          :key="team.id">
        <p class="team">
          {{ team.name }}
        </p>
      </router-link>
    </div>
    <div>
      <h1>Available Teams</h1>
      <p
          class="basicText"
          v-if="availableTeams.length == 0">
        There are no other teams to join.
      </p>
      <router-link
          v-for="team in availableTeams"
          :to="`/team/${team.id}`"
          :key="team.id">
        <p class="team">
          {{ team.name }}
        </p>
      </router-link>
    </div>
    <b-button class="create" @click="createTeam">Create New Team</b-button>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import teamConstants from '../constants/teamConstants';

Vue.use(VueRouter);

export default {
  name: 'availableTeams',
  computed: {
    ...mapState({
      teams: 'teams',
    }),
    myTeams() {
      return this.teams.filter(e => [teamConstants.NONE, teamConstants.PENDING]
        .indexOf(e.userTeamRole) === -1);
    },
    availableTeams() {
      return this.teams.filter(e => [teamConstants.NONE].indexOf(e.userTeamRole) !== -1);
    },
    pendingTeams() {
      return this.teams.filter(e => [teamConstants.PENDING].indexOf(e.userTeamRole) !== -1);
    },
  },
  methods: {
    // sends the user to the create team page
    createTeam() {
      this.$router.push('/create');
    },
  },
  mounted() {
    if (this.teams?.length === 0) this.$store.dispatch('getAllTeams');
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
