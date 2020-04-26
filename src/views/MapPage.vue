<template>
  <div>
    <Map v-bind:reservedFilter="this.reservedFilter"/>
    <b-modal id="street-confirmation-modal" ok-only title="Success">
      <p>You reserved a street!</p>
    </b-modal>
    <b-modal id="street-failure-modal" ok-only title="Error">
      <p>The street you attempted to reserved is unavailable.</p>
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
  props: {
    reservedFilter: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style>

</style>
