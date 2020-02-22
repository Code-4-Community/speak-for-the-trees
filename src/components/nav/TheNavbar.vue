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

<style lang="less">
@import '../../../assets/color-constants.less';

.header-container {
    padding: 1em;
    width: 98vw; /* setting this to 100vw pushes it
                    off the edge of the screen, just fyi */
    height: 3rem;
    position: fixed;
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
    height: 3em;
    width: 3em;
    color: @header-logo-color;
    background-color: @header-logo-bg;
}
</style>
