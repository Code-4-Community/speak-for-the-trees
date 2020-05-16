<template>
<div>
<the-navbar />
  <div id="app">
  <router-view/>
  </div>
</div>
</template>

<script>
import TheNavbar from './views/TheNavbar.vue';

export default {
  name: 'app',
  components: {
    TheNavbar,
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
