<template>
  <div>
    <h1>Team Progress</h1>
    <p
        v-if="teams.length === 0"
        class="basicText">There are no teams.</p>
    <b-row v-else id="header" class="text-left">
      <b-col class="team" cols="4">Team</b-col>
      <b-col cols="4">Goal Deadline</b-col>
      <b-col cols="2" align-self="start">Goal Progress</b-col>
      <b-col cols="2" align-self="start">Percent Done</b-col>
    </b-row>
    <b-row class="text-left" v-for="team in teams" :key="team.id">
      <b-col class="team" cols="4" align-self="center">
        <router-link :to="`/team/${team.id}`">
          {{ team.name }}
        </router-link>
      </b-col>
      <b-col cols="4" align-self="center">
        {{ new Date(team.goalCompleteDate).toDateString() }}
      </b-col>
      <b-col cols="2" align-self="center">
        {{ team.blocksCompleted}} / {{ team.goal }} blocks completed
      </b-col>
      <b-col cols="2" align-self="center">
        {{ team.percentCompleted }}%
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import privilegeLevelConstants from '../auth/constants';
import { getTeam } from '../api/api';

Vue.use(VueRouter);

export default {
  name: 'teamProgress',
  data() {
    return {
      privilegeLevelConstants,
    };
  },
  computed: {
    ...mapState({
      teams: 'teams',
      userData: 'userData',
      privilegeLevel: 'privilegeLevel',
    }),
    isAdmin() {
      return this.privilegeLevel === privilegeLevelConstants.ADMIN;
    },
  },
  methods: {
    // sends the user to the create team page
    createTeam() {
      this.$router.push('/create');
    },
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      for (let i = 0; i < this.teams.length; i += 1) {
        getTeam(this.teams[i].id).then((response) => {
          Vue.set(this.teams[i], 'goal', response.data.goal);
          Vue.set(this.teams[i], 'goalCompleteDate', response.data.goalCompleteDate);
          Vue.set(this.teams[i], 'blocksCompleted', response.data.blocksCompleted);
          Vue.set(this.teams[i], 'percentCompleted',
            Math.round(response.data.blocksCompleted / response.data.goal * 1000) / 10);
        });
      }
    }, 300);
    if (this.teams?.length === 0) this.$store.dispatch('getAllTeams');
  },
};
</script>

<style scoped lang="less">
  #header {
    background: #9AC356 !important;
    border: none !important;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .row {
    background: #D4EDAA;
    border-bottom: 1px solid white;
    width: 100vw;
    div {
      padding: 0 5px;
    }
  }

  .team {
    padding-left: 10px;
  }

  .basicText {
    color: #C4C4C4;
  }
</style>
