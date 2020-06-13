<template>
  <div>
    <div v-if="error">
      <h3>{{ errorMessage }}</h3>
    </div>
    <div v-if="!error && loaded">
      <h1>
        {{ team.name }}
        <img v-if="userTeamRole === teamConstants.NONE"
             class="clickable"
             src="../assets/plus-icon.svg"
             alt="apply to team"
             @click="applyToThisTeam">
      </h1>
      <p class="basicText">{{ team.bio }}</p>
      <b-alert v-if="userTeamRole === teamConstants.PENDING"
               class="pending-request-alert"
               variant="secondary"
               show
               dismissible>
        Your request to join is waiting to be reviewed by the team leader.
      </b-alert>
      <p class="banner">
        TEAM GOAL
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
          <img class="clickable"
               src="../assets/trophy.svg"
               alt="trophy"
               @click='toThisTeamLeaderboard'>
      </div>
      <p class="trophyProgress">{{ team.blocksCompleted }}/{{ team.goal }}</p>
      <div v-if="userTeamRole === teamConstants.LEADER">
        <div v-if="!applicantsLoaded && team.applicantsToReview"
             @click="fetchApplicants">
          <b-alert class="clickable"
                   variant="warning"
                   show>
            You have team applications to review!
          </b-alert>
        </div>
        <b-collapse v-model="applicantsLoaded">
          <div class="team-table">
            <div class="banner team-table-header">TEAM APPLICANTS</div>
            <div class="team-table-row" v-for="applicant in applicants" :key="applicant.userId">
              <p class="identifier">{{ applicant.username }}</p>
              <b-dropdown
                  id="applicant-actions"
                  class="actions"
                  size="sm"
                  dropleft
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret>
                <template v-slot:button-content>
                  <img src="../assets/ellipsis-icon.svg" alt="actions">
                </template>
                <b-dropdown-item @click="acceptApplicant(applicant.userId)">Accept</b-dropdown-item>
                <b-dropdown-item @click="denyApplicant(applicant.userId)">Reject</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </b-collapse>
      </div>
      <div class="team-table">
        <p class="banner team-table-header">MEMBERS</p>
        <div>
          <div
              class="team-table-row"
              v-for="member in team.members"
              :key="member.id">
            <p v-if="member.id === currentUserID" class="identifier">{{ member.username }} (You)</p>
            <p v-else-if="member.role === 'LEADER'" class="identifier">
              {{ member.username }} (Owner)
            </p>
            <p v-else class="identifier">{{ member.username }}</p>
            <b-dropdown
                id="member-self-actions"
                class="actions"
                v-if="userTeamRole == teamConstants.MEMBER && member.id === currentUserID"
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
                id="owner-other-actions"
                class="actions"
                v-if="userTeamRole == teamConstants.LEADER && member.id != currentUserID"
                size="sm"
                dropleft
                variant="link"
                toggle-class="text-decoration-none"
                no-caret>
              <template v-slot:button-content>
                <img src="../assets/ellipsis-icon.svg" alt="actions">
              </template>
              <b-dropdown-item @click="kickThisMember(member.id)">Kick out</b-dropdown-item>
              <b-dropdown-item @click="confirmTransfer(member)">Make leader</b-dropdown-item>
            </b-dropdown>
            <b-dropdown
                id="owner-self-actions"
                class="actions"
                v-if="userTeamRole == teamConstants.LEADER && member.id == currentUserID"
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
  </div>
</template>

<script>
import {
  getTeam, applyTeam, getApplicants, approveApplicant, transferOwnership,
  rejectApplicant, leaveTeam, kickMember, disbandTeam,
} from '../api/api';

import tokenService from '../auth/token';
import leaderboardConstants from '../constants/leaderboardConstants';
import teamConstants from '../constants/teamConstants';

export default {
  name: 'TeamView',
  data() {
    return {
      team: {},
      applicants: [],
      applicantsLoaded: false,
      loaded: false,
      error: false,
      errorMessage: '',
      teamConstants,
    };
  },
  computed: {
    userTeamRole() {
      return this.team.userTeamRole;
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
    fetchApplicants() {
      getApplicants(this.$route.params.id).then((res) => {
        this.applicants = res.data.applicants;
      }).catch((err) => {
        // eslint-disable-next-line no-alert
        alert(`Error loading applicants: ${err}`);
      }).finally(() => {
        this.applicantsLoaded = true;
      });
    },
    removeApplicant(applicantId) {
      this.applicants = this.applicants.filter(app => app.userId !== applicantId);
    },
    applyToThisTeam() {
      applyTeam(this.$route.params.id).then(() => {
        this.$store.dispatch('getAllTeams');
        return getTeam(this.$route.params.id);
      }).then((team) => {
        this.team = team.data;
        this.loaded = true;
      }).catch((error) => {
        this.$bvToast.toast(`Error: ${error.message}.`);
      });
    },
    leaveThisTeam() {
      leaveTeam(this.$route.params.id).then(() => {
        this.$store.dispatch('getAllTeams');
        this.$router.push('/available-teams');
      }).catch((error) => {
        this.$bvToast.toast(`Error: ${error.message}.`);
      });
    },
    kickThisMember(member) {
      kickMember(this.$route.params.id, member).then(() => {
        getTeam(this.$route.params.id);
      }).then((team) => {
        this.team = team.data;
        this.loaded = true;
      }).catch((error) => {
        this.$bvToast.toast(`Error: ${error.message}.`);
      });
    },
    confirmTransfer(member) {
      this.$bvModal.msgBoxConfirm(`Are you sure you would like to make ${member.username} team leader?`, {
        size: 'sm',
        okVariant: 'success',
        cancelVariant: 'danger',
        okTitle: 'Yes',
        cancelTitle: 'No',
        footerClass: 'p-2 border-top-0',
        centered: true,
      }).then((confirmed) => {
        if (confirmed) {
          return this.makeLeader({ newLeaderId: member.id });
        }
        return '';
      }).catch((error) => {
        this.$bvToast.toast(`Error: ${error.message}.`);
      });
    },
    makeLeader(member) {
      transferOwnership(this.$route.params.id, member).then(() => {
        getTeam(this.$route.params.id);
      }).then((team) => {
        this.team = team.data;
        this.loaded = true;
      }).catch((error) => {
        this.$bvToast.toast(`Error: ${error.message}.`);
      });
    },
    disbandThisTeam() {
      disbandTeam(this.$route.params.id).then(() => {
        this.$store.dispatch('getAllTeams');
        this.$router.push('/available-teams');
      }).catch((error) => {
        this.$bvToast.toast(`Error: ${error.message}.`);
      });
    },
    denyApplicant(applicantId) {
      rejectApplicant(this.$route.params.id, applicantId).then(() => {
        this.removeApplicant(applicantId);
      });
    },
    acceptApplicant(applicantId) {
      approveApplicant(this.$route.params.id, applicantId).then(() => {
        this.removeApplicant(applicantId);
        return getTeam(this.$route.params.id);
      }).then((res) => {
        this.team = res.data;
        this.loaded = true;
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
.clickable {
  cursor: pointer;
}
.pending-request-alert {
  width: 60%;
  margin: 0 auto 12px;
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
.team-table {
  margin-bottom: 16px;
}
.team-table-header {
  margin-bottom: 0;
}
.team-table-row {
  display: flex;
  background: #D4EDAA;
  padding: 0.5rem 0 0.5rem 0;
  border-bottom: 1px solid white;
  .actions {
    margin: 0 1rem 0 auto;
  }
  .identifier {
    margin: auto 0 auto 1rem;
  }
}
</style>
