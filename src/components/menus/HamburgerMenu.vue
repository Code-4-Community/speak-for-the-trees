<template>
 <div class="hamburger-container">
    <div
     v-on:click="toggle"
     class="btn"
     v-if="!active">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>
    <div
     class="menu-container"
     v-bind:class="{ menu: active, 'menu-hidden': !active }">
        <div
        v-on:click="toggle"
        class="btn btn-close x"
        v-if="active">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        <div v-if="active">
            <div class="menu__links">
                <h2>PROFILE</h2>
                <h2>RESERVATIONS</h2>
                <h2>MAP RESERVE</h2>
                <h2>SPEAK FOR THE TREES</h2>
            </div>
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

<style>

.menu-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

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

.menu__links {
    grid-area: links;
}

.btn {
  display: inline-block;
  cursor: pointer;
}

.btn-close {
  grid-area: close;
  margin-left: 1rem;
  margin-top: 1rem;
}

.bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
}

.x .bar1 {
  -webkit-transform: rotate(-45deg) translate(-8px, 8px);
  transform: rotate(-45deg) translate(-8px, 8px);
}

.x .bar2 {
    opacity: 0;
}

.x .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}


</style>
