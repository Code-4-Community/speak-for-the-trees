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

/*
  login and signup form styling
*/

.auth-logo {
  width: 204px;
  height: 168px;
  display: block;
  margin: auto;
  margin-bottom: 10vh;
}

.auth-container {
  margin-top: 5vh;
  text-align: left;
  min-width: 30vw;
}

@media only screen and (max-width: 600px) {
  .auth-container {
    width: 80vw;
  }
}

button.auth-submit {
  background: #61802E;
  padding: 0.5rem 2rem 0.5rem 2rem;
  border-radius: 5px;
  border: none;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.auth-footer {
  font-size: 12px;
  color: #AFAEAE;
}

.footer-link {
  font-size: 12px;
  color: #61802E;
}

.auth-input.form-control {
  height: 1.5rem;
  border: 2px solid #C4C4C4;
  border-radius: 5px;
}

.auth-input.form-control::placeholder, textarea.form-control::placeholder {
  color: #E5E5E5;
}

</style>
