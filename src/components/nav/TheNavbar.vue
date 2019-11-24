<template>
  <div class="header-container">
      <div class="header__hamburger-menu">
          <hamburger-menu />
      </div>
      <div class="header__logo">logo</div>
  </div>
</template>

<script>
import HamburgerMenu from '../menus/HamburgerMenu.vue';

export default {
  name: 'Header',
  components: {
    HamburgerMenu,
  },
};
</script>

<style>
.header-container {
    padding: 1rem;
    width: 95vw;
    height: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header__logo {
    height: 1rem;
    width: 1rem;
    color: white;
    background-color: grey;
    margin-right: 1rem;
}
</style>
