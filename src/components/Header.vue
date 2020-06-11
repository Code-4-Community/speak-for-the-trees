<template>
  <div class="header-container" v-show="showNavbar">
    <b-dropdown id="dropdown-1" text="Menu " variant="success" class="m-2" size="lg">
      <b-dropdown-item to="/home">Home</b-dropdown-item>
      <b-dropdown-item to="/reserve/new">Reserve Streets</b-dropdown-item>
      <b-dropdown-item to="/reserve/edit">View Reservations Map</b-dropdown-item>
      <b-dropdown-item to="/current-reservations">Reservations List</b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item to="/available-teams">View All Teams</b-dropdown-item>
      <b-dropdown-item to="/all-teams-leaderboard">All Teams Leaderboard</b-dropdown-item>
      <b-dropdown-item to="/all-volunteers-leaderboard">All Volunteers Leaderboard</b-dropdown-item>
      <b-dropdown-item to="/create">Create Team</b-dropdown-item>
      <b-dropdown-divider v-if="isAdmin" />
      <b-dropdown-item v-if="isAdmin" to="/reservations-overview">
        Reservations Overview
      </b-dropdown-item>
      <b-dropdown-item v-if="isAdmin" to="/completed-blocks-overview">
        Block Completions Overview
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item to="/settings">Settings</b-dropdown-item>
      <b-dropdown-item v-on:click="logout">
        <strong>Logout</strong>
      </b-dropdown-item>
    </b-dropdown>
    <router-link to="/home">
      <img class="header__logo" src="../assets/sftt-logo.jpg" />
    </router-link>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import constants from '../auth/constants';
import { logout } from '../auth/authAPI';

export default {
  name: 'Header',
  methods: {
    ...mapMutations({
      setUser: 'setUser',
    }),
    logout() {
      logout().finally(() => {
        this.setUser();
        this.$router.push('/login');
      });
    },
  },
  computed: {
    ...mapState({
      showNavbar: 'isUserAuthenticated',
      privilegeLevel: 'privilegeLevel',
    }),
    isAdmin() {
      return this.privilegeLevel === constants.ADMIN;
    },
  },
};
</script>

<style lang="less">
@import '../assets/color-constants.less';

.header-container {
    width: 96vw; /* setting this to 100vw pushes it
                    off the edge of the screen, just fyi */
    height: 3rem;
    margin: 1em;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header__logo {
    display:  flex;
    align-items: center;
    justify-content: center;
    margin: 3em;
    height: 3em;
    width: 3em;
    color: @header-logo-color;
    background-color: @header-logo-bg;
}

#dropdown-1__BV_toggle_, .btn-succes.focus {
  background-color: #3A681A;
  border: #3A681A;
  box-shadow: none;
}
</style>
