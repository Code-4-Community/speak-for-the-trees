<template>
  <div>
    <h1>Current Reservations</h1>
    <p
    v-if="currentReservations.length > 0"
    class="basicText">
      Press the ellipsis to complete, release or view your reservation
    </p>
    <p v-else class="basicText">You currently don't have any reservations</p>
    <div class="streetContainer" v-for="street in currentReservations" :key="street">
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
import {
  finishBlocks, releaseBlocks, getReservedBlocks,
} from '../api/api';

export default {
  name: 'CurrentReservations',
  data() {
    return {
      currentReservations: [],
    };
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
      finishBlocks({ blocks: [street] }).then((response1) => {
        // eslint-disable-next-line
        console.log(response1);
        this.$bvToast.toast(`Successful completion of ${street}`);
        return getReservedBlocks();
      }).then((response2) => {
        this.currentReservations = response2.data;
        // eslint-disable-next-line
        console.log(response2);
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
        this.$bvToast.toast(`Error in completion of ${street}.`);
      });
    },
    releaseStreet(street) {
      releaseBlocks({ blocks: [street] }).then((response1) => {
        // eslint-disable-next-line
        console.log(response1);
        this.$bvToast.toast(
          `Successful release of ${street}. You are no longer responsible for this street`,
        );
        return getReservedBlocks();
      }).then((response2) => {
        this.currentReservations = response2.data;
        // eslint-disable-next-line
        console.log(response2);
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
        this.$bvToast.toast(`Error in releasing of ${street}.`);
      });
    },
  },
  mounted() {
    getReservedBlocks().then((response) => {
      this.currentReservations = response.data;
      // eslint-disable-next-line
      console.log(response);
    }).catch((error) => {
      // eslint-disable-next-line
      console.log(error.message);
    });
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
