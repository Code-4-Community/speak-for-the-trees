<template>
  <div id='map'></div>
</template>

<script>
// Future Implementation:
// * Users can register events until they reach a max/min of total 'street length'
//   this standardizes that each volunteer does similar amounts of work.

// import { loadModules } from 'esri-loader';
// import L from 'leaflet';
// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
// import axios from 'axios';
// import { expression } from '@babel/template';

export default {
  /* eslint-disable no-alert, no-unused-vars */
  name: 'ArcMap',
  deleteFeature(id) {
    console.log('Hit');
  },
  components: {
    // LMap,
    // LTileLayer,
    // LMarker,
  },
  mounted() {
    const map = this.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
    });
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
