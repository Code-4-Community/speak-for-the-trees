<template>
  <div class="home">
    <h1>Home Page</h1>
    <div id="map-and-menu">
      <div id='menu'>
        <!-- To be a seperate component -->
        <div class='menu-title'>Your Team Name:</div>
        <div>Reserved Streets ....</div>
      </div>
      <div id='map'>
        <ArcMapLeaflet/>
      </div>
    </div>
  </div>
</template>

<script>
import ArcMapLeaflet from '../components/ArcMapLeaflet.vue';

export default {
  name: 'home',
  components: {
    ArcMapLeaflet,
  },
};
</script>

<style scoped>
#map-and-menu {
  display: flex;
  flex-direction: row;
}
#menu {
  width: 25%;
  height: 500px;
  border: 2px solid black;
}
.menu-title {
  text-align: center;
  background-color: rgb(91, 153, 91);
  color: white;
  font-size: 30px;
  line-height: 100px;
  height: 100px;
}
#map {
  width: 75%;
  height: 500px;
}
</style>
