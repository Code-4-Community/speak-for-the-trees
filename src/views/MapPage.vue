<template>
  <div>
    <h1>{{ this.header.headerVal }}</h1>
    <p class="sub-title">{{ this.header.subTitle }}</p>
    <Map v-bind:reservedFilter="this.reservedFilter" v-bind:setStreet="this.setStreet"/>
    <b-modal id="street-confirmation-modal" class="street-modal" ok-only title="Success">
      <p>You have successfuly reserved</p>
      <p>Block {{this.street}}</p>
    </b-modal>
    <b-modal id="street-failure-modal" ok-only class="street-modal" title="Error">
      <p>The street you attempted to reserved is unavailable.</p>
    </b-modal>
    <b-modal id="street-completed-modal" class="street-modal" title="Complete">
      <p>Are you sure you want to complete</p>
      <h3>{{this.street}}</h3>
    </b-modal>
    <b-modal id="street-unreserve-modal" class="street-modal" title="Unreserve">
      <p>Are you sure you want to unreserve</p>
      <h3>{{this.street}}</h3>
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
  data() {
    return {
      street: null,
    };
  },
  props: {
    reservedFilter: {
      type: Number,
      required: false,
    },
  },
  computed: {
    header() {
      let headerVal = '';
      let subTitle = '';
      if (this.reservedFilter === 0) {
        headerVal = 'Reserve New Block';
        subTitle = 'you may add multiple blocks per reservation';
      } else if (this.reservedFilter === 1) {
        headerVal = 'Edit Blocks';
        subTitle = 'press block to edit or cancel reservation';
      }
      return {
        headerVal,
        subTitle,
      };
    },
  },
  methods: {
    setStreet(street) {
      this.street = street;
    },
  },
};
</script>

<style scoped>
.sub-title {
  color: lightgray;
}

</style>
