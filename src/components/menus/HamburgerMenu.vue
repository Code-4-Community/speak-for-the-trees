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
       <h2>PROFILE</h2>
       <h2>RESERVATIONS</h2>
       <h2>MAP RESERVE</h2>
       <h2>SPEAK FOR THE TREES</h2>
       </div>
   </div>
</div>
</template>

<script>
export default {
  name: 'HamburgerMenu',
  data: () => ({
    active: true,
  }),
  methods: {
    toggle() {
      this.active = !this.active;
    },
  },
};
</script>

<style>


.menu {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  width: 20rem;
  height: 100vh;
  background-color: rgba(3, 252, 232, 0.8);
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
 top: 1rem;
 left: 1rem;
 z-index: 1001;
 display: inline-block;
 cursor: pointer;
}

.bar1, .bar2, .bar3 {
 width: 35px;
 height: 5px;
 background-color: #333;
 margin: 6px 0;
 transition: 0.4s;
}

.change .bar1 {
 -webkit-transform: rotate(-45deg) translate(-8px, 8px);
 transform: rotate(-45deg) translate(-8px, 8px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
 -webkit-transform: rotate(45deg) translate(-8px, -8px);
 transform: rotate(45deg) translate(-8px, -8px);
}


</style>
