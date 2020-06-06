<template>
  <div>
    <h1>Current Reservations</h1>
    <p
    v-if="reservedBlocks.length == 0"
    class="basicText">You currently don't have any reservations</p>
    <div class="streetContainer" v-for="street in reservedBlocks" :key="street">
      <p class="street">{{ street }}</p>
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
        @click="viewReservation(street)">
          View reservation
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  finishBlocks, releaseBlocks, getReservedBlocks,
} from '../api/api';

export default {
  name: 'CurrentReservations',
  computed: {
    ...mapState({
      reservedBlocks: 'reservedBlocks',
    }),
  },
  methods: {
    // sends to the user to the map to edit a reservation
    viewReservation(id) {
      this.$router.push({
        name: 'ReserveEdit',
        params: { activeStreetFid: id, editmode: 'edit' },
      });
    },
    completeStreet(street) {
      finishBlocks({ blocks: [street] }).then(() => {
        this.$bvToast.toast(`Successful completion of ${street}`);
        return getReservedBlocks();
      }).then((reservedBlocks) => {
        this.reservedBlocks = reservedBlocks.data;
      }).catch(() => {
        this.$bvToast.toast(`Error in completion of ${street}.`);
      });
    },
    releaseStreet(street) {
      releaseBlocks({ blocks: [street] }).then(() => {
        this.$bvToast.toast(
          `Successful release of ${street}. You are no longer responsible for this street`,
        );
        return getReservedBlocks();
      }).then((reservedBlocks) => {
        this.reservedBlocks = reservedBlocks.data;
      }).catch(() => {
        this.$bvToast.toast(`Error in releasing of ${street}.`);
      });
    },
  },
  mounted() {
    this.$store.dispatch('getReservedBlocks');
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
