<template>
  <div class="header-container">
          <b-dropdown id="dropdown-1" text="Menu " variant="success" class="m-2" size="lg">
            <b-dropdown-item href="/">Home</b-dropdown-item>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="/map">Reserve Streets</b-dropdown-item>
            <b-dropdown-item href="/current-reservations">Current Reservations</b-dropdown-item>
            <b-dropdown-item href="/create">Create Team</b-dropdown-item>
            <b-dropdown-item href="/contact">Contact</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="/sign-up" v-if="!loggedIn">
            <strong>Sign-Up</strong></b-dropdown-item>
            <b-dropdown-item href="/login" v-if="!loggedIn">
            <strong>Login</strong></b-dropdown-item>
            <b-dropdown-item href="/logout" v-if="loggedIn">
            <strong>Logout</strong></b-dropdown-item>
  </b-dropdown>
     <a href="/home" ><img class="header__logo" src="../../assets/sftt-logo-text.jpg" /></a>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {
  },
  data: () => ({
    loggedIn: true,
  }),
};
</script>

<style lang="less">
@import '../../assets/color-constants.less';

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
