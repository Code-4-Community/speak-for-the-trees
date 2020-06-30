<template>
  <div>
    <h1>Team Progress</h1>
    <p
        v-if="processedTeams.length === 0"
        class="basicText">There are no teams.</p>
    <div class="team-table" v-else>
      <b-row id="header" class="text-left">
        <b-col class="team" cols="4">Team</b-col>
        <b-col cols="4">Goal Deadline</b-col>
        <b-col cols="2" align-self="start">Goal Progress</b-col>
      </b-row>
      <b-row class="text-left" v-for="team in processedTeams"
             :key="team.id" >
        <b-col class="team" cols="4" align-self="center">
          <router-link class="team-name" tag="div" :to="`/team/${team.id}`">
            {{ team.name }}
          </router-link>
        </b-col>
        <b-col cols="4" align-self="center">
          {{ team.dateString }}
        </b-col>
        <b-col cols="2" align-self="center" :class="team.textClass">
          {{ team.blocksCompleted }} / {{ team.goal }} blocks completed
        </b-col>
      </b-row>
    </div>
    <div class="button-row">
      <b-button v-if="isAdmin"
                class="create"
                @click="downloadTeamsCSV">
        Download Teams CSV
      </b-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import privilegeLevelConstants from '../auth/constants';
import { getTeamsCSV } from '../api/api';

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
  methods: {
    /**
     * Downloads a CSV that contains all Team/User information.
     */
    downloadTeamsCSV() {
      getTeamsCSV().then(resp => this.forceFileDownload(resp.data, 'Teams Export Data'));
    },
    /**
     * Forces a download of the given data under the given file name.
     */
    forceFileDownload(data, fileName) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
  .team-table {
    box-sizing: border-box;
    width: 100vw;
    font-size: 1rem;
  }

  #header {
    background: #9AC356 !important;
    border: none !important;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
    font-weight: bold;
  }

  .row {
    background: #D4EDAA;
    border-bottom: 2px solid white;
    div {
      padding: 2px 5px;
      text-align: center;
    }
  }

  .team-name {
    cursor: pointer;
    font-weight: bold;
  }

  .complete {
    color: #35a800;
  }

  .failed {
    color: #FF7777;
  }

  .team {
    padding-left: 10px;
  }

  .basicText {
    color: #C4C4C4;
  }

  .button-row {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin: 0 5em;
  }

  button.create {
    background: #9AC356;
    color: white;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 0.5rem;
    margin: 1rem 5vw 0 0;
  }
  button.create:hover {
    box-shadow: none;
  }
</style>
