<template>
<div>
   <div
   v-on:click="toggle"
   class="btn-container"
   v-bind:class="{ change: active }">
       <div class="bar1"></div>
       <div class="bar2"></div>
       <div class="bar3"></div>
   </div>
   <div v-bind:class="{ menu: active, 'menu-hidden': !active }">
      <div v-if="active">
      <router-link :to="{ name: 'home' }" tag="h2">Home</router-link>
      <router-link :to="{ name: 'leaderboard' }" tag="h2">Leaderboard</router-link>
      <h2>Contact</h2>
       <router-link :to="{ name: 'login' }" tag="h2">Login/SignUp</router-link>
       </div>
   </div>
</div>
</template>

<script>
export default {
  name: 'HamburgerMenu',
  data: () => ({
    active: false,
  }),
  methods: {
    toggle() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="less">
@import '../../../assets/color-constants.less';

.menu {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  width: 20em;
  height: 100vh;
  background-color: @menu-bg-color;
  transition: .2s;
}

.menu-hidden {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  width: 0;
  height: 100vh;
  transition: .3s;
}

.btn-container {
 position: absolute;
 top: 1em;
 left: 1em;
 z-index: 1001;
 display: inline-block;
 cursor: pointer;
}

.bar1, .bar2, .bar3 {
 width: 2.1875em;
 height: .3125em;
 background-color: @bar-bg-color;
 margin: .375em 0;
 transition: 0.4s;
}

.change .bar1 {
 -webkit-transform: rotate(-45deg) translate(-.5em, .5em);
 transform: rotate(-45deg) translate(-.5em, .5em);
}

.change .bar2 {
  opacity: 0;
  transition: 0s;
}

.change .bar3 {
 -webkit-transform: rotate(45deg) translate(-.5em, -.5em);
 transform: rotate(45deg) translate(-.5em, -.5em);
}


</style>
