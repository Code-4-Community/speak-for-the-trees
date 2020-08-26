<template>
  <div class="cont">
    <div>
      <h1>Your Teams</h1>
      <p
          class="basicText"
          v-if="myTeams.length === 0">
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
          v-if="availableTeams.length === 0">
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
    <div class="button-row">
      <b-button class="create" @click="createTeam">Create New Team</b-button>
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
import { getTeamsCSV } from '../api/api';
import privilegeLevelConstants from '../auth/constants';
import teamConstants from '../constants/teamConstants';

Vue.use(VueRouter);

export default {

  name: 'availableTeams',

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
