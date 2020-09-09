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
      <SelectedBlocks
          v-if="reservedFilter === 0"
          v-bind:onClick="this.reserveBlocks"
          v-bind:blocks="blocksToReserve"
          v-bind:setBlocks="setReserveBlocks"
          v-bind:title="'Reserve'"/>
      <SelectedBlocks
          v-if="(reservedFilter === 1) || isAdminMap"
          v-bind:onClick="releaseBlocks"
          v-bind:blocks="blocksToRelease"
          v-bind:setBlocks="setReleaseBlocks"
          v-bind:title="'Release'"/>
      <SelectedBlocks
          v-if="(reservedFilter === 1) || isAdminMap"
          v-bind:onClick="this.completeBlocks"
          v-bind:blocks="blocksToComplete"
          v-bind:setBlocks="setCompleteBlocks"
          v-bind:title="'Complete'"/>
      <h3 v-if="reservedFilter === 1 && !!activeBlockId">Block {{this.activeBlockId}}</h3>
    </div>

    <MapComponent
      v-if="showHeader"
      class="map-container-small"
      v-bind:reservedFilter="this.reservedFilter"
      v-bind:pushBlock="this.pushBlock"
      v-bind:isAdminMap="this.isAdminMap"
      v-bind:activeBlockId="this.activeBlockId"
      ref="mapComponent"/>

    <div v-if="!showHeader">
      <MapComponent
        class="map-container-large"
        v-bind:reservedFilter="this.reservedFilter"
        v-bind:pushBlock="this.pushBlock"
        v-bind:isAdminMap="this.isAdminMap"
        v-bind:activeBlockId="this.activeBlockId"
        ref="mapComponent"/>
    </div>

    <b-modal id="block-confirmation-modal" class="block-modal" ok-only title="Success">
      <p>{{ this.modalMessage }}</p>
      <h3>{{ this.blockListString }}</h3>
    </b-modal>
    <b-modal id="error-modal" ok-only title="Error">
      <p>{{ this.modalMessage }}</p>
    </b-modal>
  </div>
</template>

<script>
import MapComponent from '../components/MapComponent.vue';
import SelectedBlocks from '../components/SelectedBlocks.vue';
import {
  reserveBlocks,
  releaseBlocks,
  finishBlocks,
} from '../api/api';
import PageTitle from '../components/PageTitle.vue';

export default {

  name: 'MapPage',

  components: {
    MapComponent,
    SelectedBlocks,
    PageTitle,
  },

  data() {
    return {
      blocksToReserve: [],
      blocksToRelease: [],
      blocksToComplete: [],
      modalMessage: null,
      blockListString: null,
      labelsVisible: true,
      showHeader: true,
    };
  },

  props: {
    activeBlockId: {
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

    // Adds a block ID to the given pending list
    pushBlock(block, selection) {
      const jsonBlock = JSON.stringify(block);
      if (this.blocksToReserve.includes(jsonBlock)
      || this.blocksToRelease.includes(jsonBlock)
      || this.blocksToComplete.includes(jsonBlock)) {
        this.modalMessage = 'You have already selected this block';
        this.$bvModal.show('error-modal');
        return;
      }
      if (selection === 'reserve') {
        this.blocksToReserve.push(jsonBlock);
        this.$bvToast.toast(`Added block ${block} to the reservations list`);
      } else if (selection === 'release') {
        this.blocksToRelease.push(jsonBlock);
        this.$bvToast.toast(`Added block ${block} to the release list`);
      } else if (selection === 'complete') {
        this.blocksToComplete.push(jsonBlock);
        this.$bvToast.toast(`Added block ${block} to the completions list`);
      }
    },

    // Calls reserve, release, or complete api routes on
    // the block IDs in the pending list
    reserveBlocks() {
      this.blockListString = this.blocksToReserve.join(', ');
      reserveBlocks({ blocks: this.blocksToReserve }).then(() => {
        this.modalMessage = 'You have successfully reserved';
        this.blocksToReserve = [];
        this.$bvModal.show('block-confirmation-modal');
        this.$refs.mapComponent.loadMap();
      }).catch(() => {
        this.modalMessage = 'At least one block was unable to be reserved';
        this.$bvModal.show('error-modal');
      });
    },

    releaseBlocks() {
      this.blockListString = this.blocksToRelease.join(', ');
      releaseBlocks({ blocks: this.blocksToRelease }).then(() => {
        this.modalMessage = 'You have successfully released';
        this.blocksToRelease = [];
        this.$bvModal.show('block-confirmation-modal');
        this.$refs.mapComponent.loadMap();
      }).catch(() => {
        this.modalMessage = 'At least one block was unable to be released';
        this.$bvModal.show('error-modal');
      });
    },

    completeBlocks() {
      this.blockListString = this.blocksToComplete.join(', ');
      finishBlocks({ blocks: this.blocksToComplete }).then(() => {
        this.modalMessage = 'You have successfully completed';
        this.blocksToComplete = [];
        this.$bvModal.show('block-confirmation-modal');
        this.$refs.mapComponent.loadMap();
      }).catch(() => {
        this.modalMessage = 'At least one block was unable to be completed';
        this.$bvModal.show('error-modal');
      });
    },

    // Sets the state of pending blocks to the given list of IDs
    setReserveBlocks(blocks) {
      this.blocksToReserve = blocks;
    },

    setReleaseBlocks(blocks) {
      this.blocksToRelease = blocks;
    },

    setCompleteBlocks(blocks) {
      this.blocksToComplete = blocks;
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

.show-text {
  margin-bottom: .75rem;
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
