<template>
<div>
  <h3>Current Reservations</h3>
  <b-container class="bv-example-row">
  <b-row v-for="street in streets" :key="street.name" class="street-row">
    <b-col><h6 class="reservation-item">
      {{street.name + ' ' + street.type}}
      </h6></b-col>
    <b-button class="reservation-item"
    @click="completeStreet(street.name + ' ' + street.type)" variant="success">
      Complete</b-button>
    <b-button class="reservation-item"
    @click="releaseStreet(street.name + ' ' + street.type)" variant="danger">
      Release</b-button>
  </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  name: 'CurrentReservations',
  data: () => ({
    streets: [
      { name: 'Abraham', type: 'ST' },
      { name: 'Hemenway', type: '' },
      { name: 'Hunington', type: 'BLVD' },
      { name: 'Parker', type: 'AVE' },
    ],
  }),
  methods: {
    completeStreet(street) {
      // TODO
      // if POST was successfull
      // this.$bvToast.toast(`Successful completion of ${street}`);
      // if POST was unsuccessfull
      this.$bvToast.toast(`Error in completion of ${street}. Please try again.`);
    },
    releaseStreet(street) {
      // if POST was unsuccessfull
      // this.$bvToast.toast(`Error in completing ${street}`);
      // if POST was successfull
      this.$bvToast.toast(`Successful release of ${street}. You are no longer responsible for this street`);
    },
  },
};
</script>

<style>
.reservation-item {
  margin: 10px;
}
</style>
