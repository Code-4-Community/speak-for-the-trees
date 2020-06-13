<template>
  <div class="cont">
    <page-title :title="'Your Teams'"
                :subtitle="subtitle" />
      <router-link
        v-for="team in myTeams"
        :to="`/team/${team.id}`"
        :key="team.id">
        <p class="team">
          {{ team.name }}
        </p>
      </router-link>
      <h3>Available teams</h3>
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
      <b-button class="create" @click="createTeam">Create New Team</b-button>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import PageTitle from '../components/PageTitle.vue';

Vue.use(VueRouter);

export default {
  name: 'availableTeams',
  components: {
    PageTitle,
  },
  computed: {
    ...mapState({
      teams: 'teams',
    }),
    myTeams() {
      return this.teams.filter(e => e.userTeamRole !== 'NONE');
    },
    availableTeams() {
      return this.teams.filter(e => e.userTeamRole === 'NONE');
    },
    subtitle() {
      return this.myTeams.length === 0 ? 'You aren\'t on a team yet, check out some below!' : '';
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
