<template>
  <div class="home">
    <h1>Home Page</h1>
    <div id="map-and-menu">
      <div id='menu'>
        <!-- To be a seperate component -->
        <div class='menu-title'>Your Team Name:</div>
        <ul id="example-1">
          <li v-for="event in events" v-bind:key="event.id">
            {{ event.id }}:{{ event.name }}
          </li>
</ul>
      </div>
      <div id='map'>
        <ArcMap/>
      </div>
    </div>
  </div>
</template>

<script>
import ArcMap from '../components/ArcMap.vue';

export default {
  name: 'home',
  components: {
    ArcMap,
  },
  computed: {
    doneTodos() {
      return this.$store.getters.doneTodos;
    },
  },
  data() {
    return {
      // dummy data
      // events: this.$store.state.events,
      events: this.$store.getters.doneTodos,
    };
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
