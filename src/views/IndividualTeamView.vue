<template>
  <div>
    <div v-if="error">
      <h3>{{ errorMessage }}</h3>
    </div>
    <div v-if="!error && loaded">
      <h1>
        {{ team.name }}
        <!-- <img v-if="permissionLevel == 2" src="../assets/edit-icon.svg" alt="edit"> -->
        <img v-if="permissionLevel == 0"
        src="../assets/plus-icon.svg"
        alt="join"
        @click="joinThisTeam">
      </h1>
      <p class="basicText">{{ team.bio }}</p>
      <p class="banner">
        TEAM GOAL
        <!-- <img v-if="permissionLevel == 2" src="../assets/edit-icon.svg" alt="edit"> -->
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
        class="memberContainer"
        v-for="member in team.members"
        :key="member.id">
          <p v-if="member.id === currentUserID" class="member">{{ member.username }} (You)</p>
          <p v-else-if="member.role === 'LEADER'" class="member">{{ member.username }} (Owner)</p>
          <p v-else class="member">{{ member.username }}</p>
          <b-dropdown
          id="member-actions"
          v-if="permissionLevel == 1 && member.id === currentUserID"
          size="sm"
          dropleft
          variant="link"
          toggle-class="text-decoration-none"
          no-caret>
            <template v-slot:button-content>
              <img src="../assets/ellipsis-icon.svg" alt="actions">
            </template>
            <b-dropdown-item @click="leaveThisTeam">Leave team</b-dropdown-item>
          </b-dropdown>
          <b-dropdown
          id="owner-actions"
          v-if="permissionLevel == 2 && member.id != currentUserID"
          size="sm"
          dropleft
          variant="link"
          toggle-class="text-decoration-none"
          no-caret>
            <template v-slot:button-content>
              <img src="../assets/ellipsis-icon.svg" alt="actions">
            </template>
            <b-dropdown-item @click="kickThisMember(member.id)">Kick out</b-dropdown-item>
          </b-dropdown>
          <b-dropdown
          id="owner-actions"
          v-if="permissionLevel == 2 && member.id == currentUserID"
          size="sm"
          dropleft
          variant="link"
          toggle-class="text-decoration-none"
          no-caret>
            <template v-slot:button-content>
              <img src="../assets/ellipsis-icon.svg" alt="actions">
            </template>
            <b-dropdown-item @click="disbandThisTeam">Disband team</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTeam, joinTeam, leaveTeam, kickMember, disbandTeam,
} from '../api/api';

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
      return 0;
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
    leaveThisTeam() {
      leaveTeam(this.$route.params.id).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        this.$router.push('/available-teams');
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
      });
    },
    kickThisMember(member) {
      kickMember(this.$route.params.id, member).then((response) => {
        // eslint-disable-next-line
        console.log(response);
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
      });
    },
    disbandThisTeam() {
      disbandTeam(this.$route.params.id).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        this.$router.push('/available-teams');
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
      });
    },
  },
};
</script>

<style scoped lang="less">
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
.memberContainer {
  display: flex;
  background: #D4EDAA;
  padding: 0.5rem 0 0.5rem 0;
  border-bottom: 1px solid white;
  div {
    margin: 0 1rem 0 auto;
  }
  .member {
    margin: auto 0 auto 1rem;
  }
}
</style>
