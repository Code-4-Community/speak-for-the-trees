<template>
  <div>
    <h1>Team Progress</h1>
    <p
        v-if="allTeams.length === 0"
        class="basicText">There are no teams.</p>
    <b-row v-else id="header" class="text-left">
      <b-col class="team" cols="4">Team</b-col>
      <b-col cols="4">Goal Deadline</b-col>
      <b-col cols="2" align-self="start">Goal Progress</b-col>
    </b-row>
    <b-row class="text-left" v-for="team in allTeams" :key="team.id">
      <b-col class="team" cols="4" align-self="center">
        <router-link :to="`/team/${team.id}`">
          {{ team.name }}
        </router-link>
      </b-col>
      <b-col cols="4" align-self="center">
        {{ new Date(team.goalCompletionDate).toDateString() }}
      </b-col>
      <b-col cols="2" align-self="center">
        {{ team.blocksCompleted }} / {{ team.goal }} blocks completed
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import privilegeLevelConstants from '../auth/constants';

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
      allTeams: 'allTeams',
      userData: 'userData',
      privilegeLevel: 'privilegeLevel',
    }),
    isAdmin() {
      return this.privilegeLevel === privilegeLevelConstants.ADMIN;
    },
  },
  mounted() {
    if (this.allTeams?.length === 0) {
      this.$store.dispatch('getAllTeamsAdmin');
    }
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
