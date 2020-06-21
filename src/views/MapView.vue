<template>
  <div>
    <h1>{{ this.header.headerVal }}</h1>
    <p class="sub-title">{{ this.header.subTitle }}</p>
    <SelectedStreets class="streets-container"
      v-if="reservedFilter === 0"
      v-bind:onClick="reserveStreets"
      v-bind:streets="streetsToReserve"
      v-bind:setBlocks="setReserveStreets"
      v-bind:title="'Reserve'"/>
    <SelectedStreets class="streets-container"
      v-if="(reservedFilter === 1) || isAdminMap"
      v-bind:onClick="unreserveStreets"
      v-bind:streets="streetsToUnreserve"
      v-bind:setBlocks="setUnreserveStreets"
      v-bind:title="'Unreserve'"/>
    <SelectedStreets class="streets-container"
      v-if="(reservedFilter === 1) || isAdminMap"
      v-bind:onClick="completeStreets"
      v-bind:streets="streetsToComplete"
      v-bind:setBlocks="setCompleteStreets"
      v-bind:title="'Complete'"/>
    <div class="header-bar">
      <!-- <b-button v-if="reservedFilter === 0" disabled>Available blocks</b-button> -->
      <!-- <b-button v-if="reservedFilter === 0" disabled>Blocks near me</b-button> -->
      <h3 v-if="reservedFilter === 1 && !!activeStreetId">Block {{this.activeStreetId}}</h3>
      <b-button v-on:click="labelsVisible = !labelsVisible">
        {{`${(this.labelsVisible ? "Hide" : "Show")} block labels`}}
      </b-button>
    </div>

    <Map
      class="map-container"
      v-bind:reservedFilter="this.reservedFilter"
      v-bind:pushStreet="this.pushStreet"
      v-bind:isAdminMap="this.isAdminMap"
      v-bind:activeStreetId="this.activeStreetId"
      v-bind:labelsVisible="this.labelsVisible"
      ref="map"/>

    <b-modal id="street-confirmation-modal" class="street-modal" ok-only title="Success">
      <p>{{ this.modalMessage }}</p>
      <h3>{{ this.blockListString }}</h3>
    </b-modal>
    <b-modal id="error-modal" ok-only title="Error">
      <p>{{ this.modalMessage }}</p>
    </b-modal>
  </div>
</template>

<script>
import Map from '../components/Map.vue';
import SelectedStreets from '../components/SelectedStreets.vue';
import {
  reserveBlocks,
  releaseBlocks,
  finishBlocks,
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
      modalMessage: null,
      blockListString: null,
      labelsVisible: true,
    };
  },
  props: {
    activeStreetId: {
      type: String,
      required: false,
    },
    isAdminMap: {
      type: Boolean,
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
      } else if (this.isAdminMap) {
        headerVal = 'Edit Active Blocks';
        subTitle = 'press block to edit or cancel reservation';
      }
      return {
        headerVal,
        subTitle,
      };
    },
    reservedFilter() {
      if (this.$route.params.editmode === 'edit') {
        return 1;
      // eslint-disable-next-line
      } else if (this.$route.params.editmode === 'new') {
        return 0;
      } else {
        return null;
      }
    },
  },
  methods: {
    pushStreet(street, selection) {
      if (this.streetsToReserve.includes(JSON.stringify(street))
      || this.streetsToUnreserve.includes(JSON.stringify(street))
      || this.streetsToComplete.includes(JSON.stringify(street))) {
        this.modalMessage = 'You have already selected this street';
        this.$bvModal.show('error-modal');
        return;
      }
      if (selection === 'reserve') {
        this.streetsToReserve.push(JSON.stringify(street));
      } else if (selection === 'unreserve') {
        this.streetsToUnreserve.push(JSON.stringify(street));
      } else if (selection === 'complete') {
        this.streetsToComplete.push(JSON.stringify(street));
      }
    },
    reserveStreets() {
      this.blockListString = this.streetsToReserve.join(', ');
      reserveBlocks({ blocks: this.streetsToReserve }).then(() => {
        this.modalMessage = 'You have successfuly reserved';
        this.streetsToReserve = [];
        this.$bvModal.show('street-confirmation-modal');
        this.$refs.map.loadMap();
      }).catch(() => {
        this.modalMessage = 'At least one block was unable to be reserved';
        this.$bvModal.show('error-modal');
      });
    },
    unreserveStreets() {
      this.blockListString = this.streetsToUnreserve.join(', ');
      releaseBlocks({ blocks: this.streetsToUnreserve }).then(() => {
        this.modalMessage = 'You have successfuly unreserved';
        this.streetsToUnreserve = [];
        this.$bvModal.show('street-confirmation-modal');
        this.$refs.map.loadMap();
      }).catch(() => {
        this.modalMessage = 'At least one block was unable to be unreserved';
        this.$bvModal.show('error-modal');
      });
    },
    completeStreets() {
      this.blockListString = this.streetsToComplete.join(', ');
      finishBlocks({ blocks: this.streetsToComplete }).then(() => {
        this.modalMessage = 'You have successfully completed';
        this.streetsToComplete = [];
        this.$bvModal.show('street-confirmation-modal');
        this.$refs.map.loadMap();
      }).catch(() => {
        this.modalMessage = 'At least one block was unable to be completed';
        this.$bvModal.show('street-confirmation-modal');
      });
    },
    setReserveStreets(blocks) {
      this.streetsToReserve = blocks;
    },
    setUnreserveStreets(blocks) {
      this.streetsToUnreserve = blocks;
    },
    setCompleteStreets(blocks) {
      this.streetsToComplete = blocks;
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
  width: auto;
  background-color: #9AC356;
  margin-bottom: 5px;
}

.label-toggle {
  margin-left: 5px;
}

.streets-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  width:20%;
  align-items: baseline;
  padding: 5px;
}

@media only screen and (max-width: 700px) {
  .streets-container {
    width: auto;
    margin-left: 5px;
  }
}

.map-container {
    width: 95vw;
    height: 50vh;
}

@media only screen and (max-width: 700px) {
  .map-container {
    width: 90vw;
  }
}
</style>
