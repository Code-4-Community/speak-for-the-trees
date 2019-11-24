<template>
  <div class="home">
    <h1>Hamburger Menu</h1>
    <hamburger-menu />
  </div>
</template>

<script>
import HamburgerMenu from '../components/menus/HamburgerMenu.vue';

export default {
  name: 'home',
  components: {
    HamburgerMenu,
  },
};
</script>
