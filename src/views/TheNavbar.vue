<template>
  <div class="header-container" v-show="loggedIn">
    <b-dropdown id="dropdown-1" text="Menu " variant="success" class="m-2" size="lg">
      <b-dropdown-item to="/home">Home</b-dropdown-item>
      <b-dropdown-item to="/profile">Profile</b-dropdown-item>
      <b-dropdown-item to="/map">Reserve Streets</b-dropdown-item>
      <b-dropdown-item to="current-reservations">Current Reservations</b-dropdown-item>
      <b-dropdown-item to="/create">Create Team</b-dropdown-item>
      <!-- <b-dropdown-item to="/contact">Contact</b-dropdown-item> -->
      <b-dropdown-divider />
      <b-dropdown-item v-on:click="logout">
        <strong>Logout</strong>
      </b-dropdown-item>
    </b-dropdown>
    <router-link to="/home">
      <img class="header__logo" src="../assets/sftt-logo-text.jpg" />
    </router-link>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { logout } from '../auth/authAPI';
import tokenService from '../auth/token';

export default {
  name: 'Header',
  methods: {
    ...mapMutations({
      setUser: 'setUser',
    }),
    logout() {
      logout();
      this.setUser();
      this.$router.push('/login');
    },
  },
  data() {
    return {
      loggedIn: tokenService.getPrivilegeLevel() > -1,
    };
  },
  computed: mapState({
    isLoggedIn: 'user.isLoggedIn',
  }),
};
</script>

<style lang="less">
@import '../assets/color-constants.less';

.header-container {
    width: 98vw; /* setting this to 100vw pushes it
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
</style>
