<template>
  <div>
    <Map/>
    <b-modal id="street-confirmation-modal" ok-only title="Success!">
      <p>You reserved a street!</p>
    </b-modal>
  </div>
</template>

<script>

import Map from './Map.vue';

export default {
  name: 'MapPage',
  components: {
    Map,
  },
};
</script>

<style>

</style>
