<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <Board v-bind:individuals="this.individuals" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Board from '../components/Board.vue';
import constants from '../constants/leaderboardConstants';
import { getTeam } from '../api/api';

export default {
  name: 'TeamLeaderboard',
  components: {
    Board,
  },
  data() {
    return {
      loading: true,
      specificTeam: {
        members: [],
      },
    };
  },
  mounted() {
    this.$store.dispatch('getBlocksLeaderboard');
    switch (this.route) {
      case constants.ALL_TEAMS_LEADERBOARD:
        this.$store.dispatch('getBlocksLeaderboard');
        break;
      case constants.ALL_VOLUNTEERS_LEADERBOARD:
        this.$store.dispatch('getBlocksLeaderboard');
        break;
      case constants.INDIVIDUAL_TEAM_LEADERBOARD:
        if (this.teamID > 0) {
          getTeam(this.teamID).then((response) => {
            this.specificTeam = response.data;
            this.loaded = true;
          }).catch(() => {
            this.$bvToast.toast('An error occured while loading this team, please try again.');
          });
        }
        break;
      default:
        throw new Error('Unrecognized route');
    }
  },
  computed: {
    ...mapState({
      teamsLeaderboard: 'allTeamsLeaderboard',
      volunteersLeaderboard: 'allVolunteersLeaderboard',
    }),
    route() {
      return this.$route.name;
    },
    teamID() {
      return this.$route.params.id || -1;
    },
    title() {
      switch (this.route) {
        case constants.ALL_TEAMS_LEADERBOARD:
          return 'All Teams';
        case constants.ALL_VOLUNTEERS_LEADERBOARD:
          return 'All Volunteers';
        case constants.INDIVIDUAL_TEAM_LEADERBOARD:
          return `Team ${this.specificTeam?.name}'s Leaderboard!`;
        default:
          throw new Error('Unrecognized route');
      }
    },
    description() {
      switch (this.route) {
        case constants.ALL_TEAMS_LEADERBOARD:
          return 'Compete with other teams of Speak for the Trees volunteers!';
        case constants.ALL_VOLUNTEERS_LEADERBOARD:
          return 'Celebrate all the contributions of our Speak for the Trees volunteers!';
        case constants.INDIVIDUAL_TEAM_LEADERBOARD:
          return `Celebrate all the contributions of ${this.specificTeam?.name}!`;
        default:
          throw new Error('Unrecognized route');
      }
    },
    individuals() {
      switch (this.route) {
        case constants.ALL_TEAMS_LEADERBOARD:
          return this.teamsLeaderboard;
        case constants.ALL_VOLUNTEERS_LEADERBOARD:
          return this.volunteersLeaderboard;
        case constants.INDIVIDUAL_TEAM_LEADERBOARD:
          return this.specificTeam.members;
        default:
          throw new Error('Unrecognized route');
      }
    },
  },
};
</script>

<style scoped lang="less">
p {
  color: #C4C4C4;
}
</style>
