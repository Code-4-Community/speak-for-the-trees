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
        @click="completeStreet(street)">
          Complete
        </b-dropdown-item>
        <b-dropdown-item
        @click="releaseStreet(street)">
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
import {
  finishBlocks, releaseBlocks,
} from '../api/api';

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
      finishBlocks([JSON.stringify(street.FID)]).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        // call GET blocks to update view
        this.$bvToast.toast(`Successful completion of ${street.name}`);
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
        this.$bvToast.toast(`Error in completion of ${street.name}.`);
      });
    },
    releaseStreet(street) {
      releaseBlocks([JSON.stringify(street.FID)]).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        // call GET blocks to update view
        this.$bvToast.toast(
          `Successful release of ${street.name}. You are no longer responsible for this street`,
        );
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
        this.$bvToast.toast(`Error in releasing of ${street.name}.`);
      });
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
