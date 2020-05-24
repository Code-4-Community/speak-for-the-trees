<template>
  <div>
    <div v-if="error">
      <h3>{{ errorMessage }}</h3>
    </div>
    <div v-if="!error && loaded">
      <h1>
        {{ team.name }}
        <img v-if="permissionLevel == 2" src="../assets/edit-icon.svg" alt="edit">
        <img v-if="permissionLevel == 0"
        src="../assets/plus-icon.svg"
        alt="join"
        @click="joinThisTeam">
      </h1>
      <p class="basicText">{{ team.bio }}</p>
      <p class="banner">
        TEAM GOAL  <img v-if="permissionLevel == 2" src="../assets/edit-icon.svg" alt="edit">
      </p>
      <p class="basicText">Click on the trophy to view the team leaderboard</p>
      <div class="goal">
          <p>{{ team.goal }} BLOCKS</p>
          <p>BY</p>
          <p>{{ formattedTargetDate }}</p>
      </div>
      <div class="progressWrapper">
        <div class="progress">
          <div class="progress-bar"
          :style="barStyle"
          role="progressbar">
          {{ progressPercent }}%</div>
        </div>
          <img src="../assets/trophy.svg" alt="trophy" @click='toThisTeamLeaderboard'>
      </div>
      <p class="trophyProgress">{{ team.blocksCompleted }}/{{ team.goal }}</p>
      <p class="members">MEMBERS</p>
      <div v-if="permissionLevel >= 1">
        <div
        v-for="member in team.members"
        :key="member.id">
          <p v-if="member.id === currentUserID" class="member">{{ member.username }} (You)</p>
          <p v-else-if="member.role === 'LEADER'" class="member">{{ member.username }} (Owner)</p>
          <p v-else class="member">{{ member.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeam, joinTeam } from '../api/api';

import tokenService from '../auth/token';
import leaderboardConstants from '../constants/leaderboardConstants';

export default {
  name: 'TeamView',
  data() {
    return {
      team: {},
      loaded: false,
      error: false,
      errorMessage: '',
    };
  },
  computed: {
    permissionLevel() {
      return 2;
    },
    // format the target date into the appropriate format
    formattedTargetDate() {
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const [{ value: mo },,
        { value: da },,
        { value: ye }] = dtf.formatToParts(this.team.goalCompleteDate);
      return `${mo}/${da}/${ye}`;
    },
    // calculates the percentage of blocks completed
    progressPercent() {
      return Math.round(this.team.blocksCompleted / this.team.goal * 100, 2);
    },
    // calculates the width of the progress bar
    barStyle() {
      return {
        '--barWidth': `${this.progressPercent}%`,
      };
    },
    currentUserID() {
      return tokenService.getUserID();
    },
  },
  mounted() {
    getTeam(this.$route.params.id).then((response) => {
      this.team = response.data;
      this.loaded = true;
    }).catch(() => {
      this.error = true;
      this.errorMessage = 'Error: The requested team does not exist';
      this.loaded = true;
    });
  },
  methods: {
    toThisTeamLeaderboard() {
      this.$router.push({
        name: leaderboardConstants.INDIVIDUAL_TEAM_LEADERBOARD,
        params: {
          id: this.$route.params.id,
        },
      });
    },
    joinThisTeam() {
      joinTeam(this.$route.params.id).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        this.$router.push('/home');
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
      });
    },
  },
};
</script>

<style scoped>
.edit {
  border: none;
  background: none;
}
.progressWrapper {
  display: flex;
}
.progressWrapper a {
  margin: 0 auto 1.5rem 0;
}
.trophyProgress {
  text-align: right;
  margin: auto 2rem 1rem auto;
}
.banner {
  background: #9AC356;
  font-size: 14px;
  padding: 0.5rem 0;
}
.banner img {
  margin: 0;
  height: 100%;
}
.progress {
  margin: 0.5rem auto 2rem 10vw;
  width: 70vw;
}
.progress-bar {
  background-color: #9AC356;
  width: var(--barWidth);
}
.basicText {
  color: #C4C4C4;
  padding: 0 2rem;
}
.goal {
  display: flex;
  justify-content: space-around;
  padding: 0 3rem;
}
.members {
  background: #9AC356;
  font-size: 14px;
  padding: 0.5rem 0;
  margin-bottom: 0;
}
.member {
  text-align: left;
  background: #D4EDAA;
  margin: 0;
  padding: 0.5rem 0 0.5rem 1.5rem;
  border-bottom: 1px solid white;
}
</style>
