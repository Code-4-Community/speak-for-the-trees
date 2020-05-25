<template>
  <div>
    <h1>Current Reservations</h1>
    <p class="basicText">Press the ellipsis to complete, release or view your reservation</p>
    <div class="streetContainer" v-for="street in reservedStreets" :key="street.name">
      <p class="street">{{ street.name + ' ' + street.type }}</p>
      <b-dropdown size="sm" dropleft variant="link" toggle-class="text-decoration-none" no-caret>
        <template v-slot:button-content>
          <img src="../assets/ellipsis-icon.svg" alt="actions" />
        </template>
        <b-dropdown-item
        @click="completeStreet(street.name + ' ' + street.type)">
          Complete
        </b-dropdown-item>
        <b-dropdown-item
        @click="releaseStreet(street.name + ' ' + street.type)">
          Release
        </b-dropdown-item>
        <b-dropdown-item
        @click="viewReservation(street.FID)">
          View reservation
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CurrentReservations',
  computed: {
    ...mapState(['reservedStreets']),
    reservedStreets() {
      return this.$store.getters.GET_RESERVED_STREETS;
    },
  },
  methods: {
    // sends to the user to the map to edit a reservation
    viewReservation(fid) {
      this.$router.push({
        name: 'ReserveEdit',
        params: { activeStreetFid: fid, editmode: 'edit' },
      });
    },
    completeStreet(street) {
      // TODO
      // if POST was successfull
      // this.$bvToast.toast(`Successful completion of ${street}`);
      // if POST was unsuccessfull
      this.$bvToast.toast(
        `Error in completion of ${street}. Please try again.`,
      );
    },
    releaseStreet(street) {
      // if POST was unsuccessfull
      // this.$bvToast.toast(`Error in completing ${street}`);
      // if POST was successfull
      this.$bvToast.toast(
        `Successful release of ${street}. You are no longer responsible for this street`,
      );
    },
  },
};
</script>

<style scoped lang="less">
.basicText {
  color: #C4C4C4;
}
.streetContainer {
  display: flex;
  background: #D4EDAA;
  padding: 0.5rem 0 0.5rem 0;
  border-bottom: 1px solid white;
  width: 100vw;
  div {
    margin: 0 1rem 0 auto;
  }
  p {
    margin: auto 0 auto 2rem;
  }
}
</style>
