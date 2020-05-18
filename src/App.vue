<template>
  <div>
    <Header/>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Header from './components/Header.vue';
import { refresh } from './auth/authAPI';
import tokenService from './auth/token';

export default {
  name: 'app',
  components: {
    Header,
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser',
    }),
  },
  mounted() {
    if (tokenService.getRefreshToken()) {
      refresh().finally(() => {
        this.setUser();
        this.$store.dispatch('getUserData');
        this.$store.dispatch('getUserTeam');
      });
    }
  },
};
</script>

<style lang="less">
@import './assets/color-constants.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @app-text;
  display: flex;
  justify-content: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
