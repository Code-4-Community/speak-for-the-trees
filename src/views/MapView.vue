<template>
  <div>
    <page-title :returnButton="true" v-if="showHeader" :subtitle="this.header.subTitle" title="">
      <h3 id="hide-title-tt" class="caret-icon" @click="showHeader=false">Reserve New Block ^</h3>
      <b-tooltip target="hide-title-tt" triggers="hover" placement="bottom">
        Hide Title
      </b-tooltip>
    </page-title>
    <div v-else>
      <b-button class="show-text" @click="showHeader=true">show</b-button>
    </div>
    <b-tooltip target="hide-title-tt" triggers="hover" placement="bottom">
      Hide Title
    </b-tooltip>
    <div class="action-row">
      <SelectedStreets
          v-if="reservedFilter === 0"
          v-bind:onClick="reserveStreets"
          v-bind:streets="streetsToReserve"
          v-bind:setBlocks="setReserveStreets"
          v-bind:title="'Reserve'"/>
      <SelectedStreets
          v-if="(reservedFilter === 1) || isAdminMap"
          v-bind:onClick="unreserveStreets"
          v-bind:streets="streetsToUnreserve"
          v-bind:setBlocks="setUnreserveStreets"
          v-bind:title="'Unreserve'"/>
      <SelectedStreets
          v-if="(reservedFilter === 1) || isAdminMap"
          v-bind:onClick="completeStreets"
          v-bind:streets="streetsToComplete"
          v-bind:setBlocks="setCompleteStreets"
          v-bind:title="'Complete'"/>
      <h3 v-if="reservedFilter === 1 && !!activeStreetId">Block {{this.activeStreetId}}</h3>
    </div>
    <div class="header-bar">
      <!-- <b-button v-if="reservedFilter === 0" disabled>Available blocks</b-button> -->
      <!-- <b-button v-if="reservedFilter === 0" disabled>Blocks near me</b-button> -->
    </div>
    <Map
      v-if="showHeader"
      class="map-container-small"
      v-bind:reservedFilter="this.reservedFilter"
      v-bind:pushStreet="this.pushStreet"
      v-bind:isAdminMap="this.isAdminMap"
      v-bind:activeStreetId="this.activeStreetId"
      ref="map"/>

    <div v-if="!showHeader">
      <Map
        class="map-container-large"
        v-bind:reservedFilter="this.reservedFilter"
        v-bind:pushStreet="this.pushStreet"
        v-bind:isAdminMap="this.isAdminMap"
        v-bind:activeStreetId="this.activeStreetId"
        ref="map"/>
    </div>

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
import PageTitle from '../components/PageTitle.vue';

export default {
  name: 'MapPage',
  components: {
    Map,
    SelectedStreets,
    PageTitle,
  },
  data() {
    return {
      streetsToReserve: [],
      streetsToUnreserve: [],
      streetsToComplete: [],
      modalMessage: null,
      blockListString: null,
      labelsVisible: true,
      showHeader: true,
    };
  },
  props: {
    activeStreetId: {
      type: String,
      required: false,
    },
  },
  computed: {
    isAdminMap() {
      return this.$route.name === 'AdminMap';
    },
    header() {
      let headerVal = '';
      let subTitle = '';
      if (this.reservedFilter === 0) {
        headerVal = 'Reserve New Blocks';
        subTitle = 'you may add multiple blocks per reservation';
      } else if (this.reservedFilter === 1) {
        headerVal = 'Edit Reservations';
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
        this.$bvToast.toast(`Added block ${street} to the reservations list`);
      } else if (selection === 'unreserve') {
        this.streetsToUnreserve.push(JSON.stringify(street));
        this.$bvToast.toast(`Added block ${street} to the unreserve list`);
      } else if (selection === 'complete') {
        this.streetsToComplete.push(JSON.stringify(street));
        this.$bvToast.toast(`Added block ${street} to the completions list`);
      }
    },
    reserveStreets() {
      this.blockListString = this.streetsToReserve.join(', ');
      reserveBlocks({ blocks: this.streetsToReserve }).then(() => {
        this.modalMessage = 'You have successfully reserved';
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
        this.modalMessage = 'You have successfully unreserved';
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
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding:5px;
}

.caret-icon {
  margin-left: 5px;
  cursor: pointer;
}

.sub-title {
  color: lightgray;
}

.show-text {
  margin-bottom: .75rem;
}

.header-bar {
  display: flex;
  padding: 0 5px;
  justify-content: flex-end;
  width: auto;
  /*background-color: #9AC356;*/
  margin-bottom: 5px;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  flex-wrap: wrap;
}

.map-container-small {
    height: 55vh;
    width: 95vw;
    position: relative;
}

@media only screen and (max-width: 700px) {
  .map-container-small {
    width: 92vw;
  }
}

.map-container-large {
    width: 95vw;
    position: relative;
    height: 75vh;
}

@media only screen and (max-width: 700px) {
  .map-container {
    width: 90vw;
    margin: 0 auto;
  }

  .action-row {
    justify-content: center;
    height: 6rem;
  }

  .map-container-large {
    width: 92vw;
  }
}
</style>
