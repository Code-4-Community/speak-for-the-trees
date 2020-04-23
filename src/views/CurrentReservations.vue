<template>
<div>
  <h3>Current Reservations</h3>
  <b-container class="bv-example-row">
  <b-row v-for="street in streets" :key="street.name" class="street-row">
    <b-col><h6 class="reservation-item">
      {{street.name + ' ' + street.type}}
      </h6></b-col>
    <b-button class="reservation-item" variant="success">Complete</b-button>
    <b-button class="reservation-item" variant="danger">Release</b-button>
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
};
</script>

<style>
.reservation-item {
  margin: 10px;
}
</style>
