<template>
  <div>
    <h1>{{ this.header.headerVal }}</h1>
    <p class="sub-title">{{ this.header.subTitle }}</p>
    <SelectedStreets class="streets-container"
      v-if="reservedFilter === 0"
      v-bind:onClick="reserveStreets"
      v-bind:streets="streetsToReserve"
      v-bind:title="'Reserve'"/>
    <SelectedStreets class="streets-container"
      v-if="reservedFilter === 1"
      v-bind:onClick="() => this.$bvModal.show('street-unreserve-modal')"
      v-bind:streets="streetsToUnreserve"
      v-bind:title="'Unreserve'"/>
    <SelectedStreets class="streets-container"
      v-if="reservedFilter === 1"
      v-bind:onClick="() => this.$bvModal.show('street-completed-modal')"
      v-bind:streets="streetsToComplete"
      v-bind:title="'Complete'"/>
    <div class="header-bar">
      <b-button v-if="reservedFilter === 0" disabled>Available blocks</b-button>
      <b-button v-if="reservedFilter === 0" disabled>Blocks near me</b-button>
      <h3 v-if="reservedFilter === 1 && !!activeStreetFid">Block {{this.activeStreetFid}}</h3>
    </div>

    <Map
      v-bind:reservedFilter="this.reservedFilter"
      v-bind:pushStreet="this.pushStreet"
      v-bind:activeStreetFid="this.activeStreetFid"/>

    <b-modal id="street-confirmation-modal" class="street-modal" ok-only title="Success">
      <p>You have successfuly reserved</p>
      <p>Blocks {{ this.streetsToReserve.join(', ') }}</p>
    </b-modal>
    <b-modal id="street-failure-modal" ok-only class="street-modal" title="Error">
      <p>The street you attempted to reserved is unavailable.</p>
    </b-modal>
    <b-modal id="street-completed-modal" class="street-modal" title="Complete">
      <p>Are you sure you want to complete</p>
      <h3>Blocks {{ this.streetsToComplete.join(', ') }}?</h3>
    </b-modal>
    <b-modal id="street-unreserve-modal" class="street-modal" title="Unreserve">
      <p>Are you sure you want to unreserve</p>
      <h3>Blocks {{this.streetsToUnreserve.join(', ')}}?</h3>
    </b-modal>
    <b-modal id="street-in-list-modal" ok-only title="Error">
      <p>You have already selected this street</p>
    </b-modal>
  </div>
</template>

<script>
import Map from '../components/Map.vue';
import SelectedStreets from '../components/SelectedStreets.vue';
import {
  reserveBlocks,
} from '../api/api';

export default {
  name: 'MapPage',
  components: {
    Map,
    SelectedStreets,
  },
  data() {
    return {
      streetsToReserve: [],
      streetsToUnreserve: [],
      streetsToComplete: [],
    };
  },
  props: {
    activeStreetFid: {
      type: String,
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
    reservedFilter() {
      return this.$route.params.editmode === 'edit' ? 1 : 0;
    },
  },
  methods: {
    pushStreet(street, selection) {
      if (this.streetsToReserve.includes(street)
      || this.streetsToUnreserve.includes(street)
      || this.streetsToComplete.includes(street)) {
        this.$bvModal.show('street-in-list-modal');
        return;
      }
      if (selection === 'reserve') {
        this.streetsToReserve.push(JSON.stringify(street));
      } else if (selection === 'unreserve') {
        this.streetsToUnreserve.push(street);
      } else if (selection === 'complete') {
        this.streetsToComplete.push(street);
      }
    },
    // getFids() {
    //   const fids = [];
    //   this.currentReservations.forEach((street) => {
    //     fids.push(+street.fid);
    //   });
    //   return fids;
    // },
    async reserveStreets() {
      reserveBlocks({ blocks: this.streetsToReserve }).then((response) => {
        // eslint-disable-next-line
        console.log(response);
        this.$bvModal.show('street-confirmation-modal');
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error.message);
      });
    },
    async unreserveStreets() {
      // reserve streets backend call
      // .then(
    },
    async completeStreets() {
      // reserve streets backend call
      // .then(
    },
  },
};
</script>

<style scoped>
.sub-title {
  color: lightgray;
}

.header-bar {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: auto;
  background-color: #9AC356;
  padding: 5px;
  margin: 10px;
}

.streets-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  width:60%;
  align-items: baseline;
  padding: 5px;
}

@media only screen and (max-width: 700px) {
  .streets-container {
    width: 100%;
    margin-left: 5px;
  }
}
</style>
