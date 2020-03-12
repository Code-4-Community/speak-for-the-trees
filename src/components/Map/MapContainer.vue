<template>
  <div class="map-container">
    <Checkout class="checkout"></Checkout>
    <Map class="map"></Map>
  </div>
</template>

<script>
import Checkout from './Checkout.vue';
import Map from './Map.vue';

export default {
  name: 'MapContainer',
  components: {
    Checkout,
    Map,
  },
};
</script>

<style scoped>
.map-container {
  display: grid;
  grid-template-columns: 1fr / 3fr;
}

.checkout {
  grid-column: 1 / 2;
  z-index: 0;
}

.map {
  grid-column: 2 / 3;
}
</style>
