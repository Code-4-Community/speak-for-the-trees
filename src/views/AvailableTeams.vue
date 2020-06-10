<template>
  <div class="cont">
      <h1>Your teams</h1>
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
      <h1>Available teams</h1>
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
      <b-button v-if="userData.privilegeLevel === userConstants.ADMIN"
                class="create"
                @click="downloadCSV">
          Download Teams CSV
      </b-button>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import { getTeamsCSV } from '../api/api';
import userConstants from '../constants/userConstants';

Vue.use(VueRouter);

export default {
  name: 'availableTeams',
  data() {
    return {
      userConstants,
    };
  },
  computed: {
    ...mapState({
      teams: 'teams',
      userData: 'userData',
    }),
    myTeams() {
      return this.teams.filter(e => e.userTeamRole !== 'NONE');
    },
    availableTeams() {
      return this.teams.filter(e => e.userTeamRole === 'NONE');
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
    async downloadCSV() {
      try {
        const resp = await getTeamsCSV();
        if (resp.status === 200) {
          this.forceFileDownload(resp.data, 'Teams Export Data');
        }
      } catch (error) {
        // Something went wrong
      }
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
