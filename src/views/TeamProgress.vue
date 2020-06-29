<template>
  <div>
    <h1>Team Progress</h1>
    <p
        v-if="processedTeams.length === 0"
        class="basicText">There are no teams.</p>
    <div v-else>
      <b-row id="header" class="text-left">
        <b-col class="team" cols="4">Team</b-col>
        <b-col cols="4">Goal Deadline</b-col>
        <b-col cols="2" align-self="start">Goal Progress</b-col>
      </b-row>
      <b-row class="text-left" v-for="team in processedTeams"
             :key="team.id" :class="team.textClass">
        <b-col class="team" cols="4" align-self="center">
          <router-link :to="`/team/${team.id}`">
            {{ team.name }}
          </router-link>
        </b-col>
        <b-col cols="4" align-self="center">
          {{ team.dateString }}
        </b-col>
        <b-col cols="2" align-self="center">
          {{ team.blocksCompleted }} / {{ team.goal }} blocks completed
        </b-col>
      </b-row>
    </div>
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
      allTeamsAdmin: 'allTeamsAdmin',
      userData: 'userData',
      privilegeLevel: 'privilegeLevel',
    }),
    isAdmin() {
      return this.privilegeLevel === privilegeLevelConstants.ADMIN;
    },
    processedTeams() {
      const processed = this.allTeamsAdmin.map((team) => {
        const today = new Date();
        const completionDate = new Date(team.goalCompletionDate);
        const pastGoalDate = today > team.goalCompletionDate;
        const metGoal = team.blocksCompleted >= team.goal;
        let textClass;
        if (metGoal) {
          textClass = 'complete';
        } else if (pastGoalDate) {
          textClass = 'failed';
        } else {
          textClass = 'incomplete';
        }
        return {
          id: team.id,
          dateString: completionDate.toDateString(),
          name: team.name,
          blocksCompleted: team.blocksCompleted,
          goal: team.goal,
          pastGoalDate,
          metGoal,
          textClass,
        };
      });
      return processed;
    },
  },
  mounted() {
    if (this.allTeamsAdmin?.length === 0) {
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
    border-bottom: 1px solid white;
    width: 100vw;
    div {
      padding: 0 5px;
    }
  }

  .incomplete {
    background: #DDDDDD;
  }

  .complete {
    background: #99FF99;
  }

  .failed {
    background: #FF7777;
  }

  .team {
    padding-left: 10px;
  }

  .basicText {
    color: #C4C4C4;
  }
</style>
