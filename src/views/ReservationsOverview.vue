<template>
  <div>
    <h1>All Reservations</h1>
    <p
    v-if="allReservedBlocks.blocks.length == 0"
    class="basicText">There are currently no reservations</p>
    <b-row v-else id="header" class="text-left">
      <b-col id="ids" cols="2">ID</b-col>
      <b-col cols="4">User</b-col>
      <b-col cols="4">Reservation date</b-col>
      <b-col cols="2" align-self="start"></b-col>
    </b-row>
    <b-row class="text-left" cols="14" v-for="block in allReservedBlocks.blocks" :key="block.fid">
      <b-col id="ids" cols="2" align-self="center">{{ block.fid }}</b-col>
      <b-col cols="4" align-self="center">{{ block.username }}</b-col>
      <b-col cols="4" align-self="center">{{ block.dateUpdated }}</b-col>
      <b-col id="icon" cols="2" align-self="center">
        <b-dropdown
        size="sm"
        dropleft
        variant="link"
        toggle-class="text-decoration-none"
        no-caret>
          <template v-slot:button-content>
              <img src="../assets/ellipsis-icon.svg" alt="actions" />
          </template>
          <b-dropdown-item
          @click="resetToOpen(block.fid)">
              Reset to open
          </b-dropdown-item>
          <b-dropdown-item
          @click="completeBlock(block.fid)">
              Complete
          </b-dropdown-item>
          <b-dropdown-item
          @click="viewReservation(block.fid)">
              View reservation
          </b-dropdown-item>
          </b-dropdown>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  finishBlocks, releaseBlocks,
} from '../api/api';

export default {
  name: 'ReservationsOverview',
  methods: {
    resetToOpen(block) {
      releaseBlocks({ blocks: [block] }).then(() => {
        this.$bvToast.toast(`Successful opening of ${block}.`);
        this.$store.dispatch('getReservedBlocksAdmin');
      }).catch(() => {
        this.$bvToast.toast(`Error in opening of ${block}.`);
      });
    },
    completeBlock(block) {
      finishBlocks({ blocks: [block] }).then(() => {
        this.$bvToast.toast(`Successful completion of ${block}`);
        this.$store.dispatch('getReservedBlocksAdmin');
      }).catch(() => {
        this.$bvToast.toast(`Error in completion of ${block}.`);
      });
    },
    viewReservation(block) {
      this.$router.push({
        name: 'ReserveEdit',
        params: { activeStreetFid: block, editmode: 'edit' },
      });
    },
  },
  computed: {
    sortedBlocks() {
      const copy = this.allReservedBlocks;
      copy.sort((a, b) => a.date < b.date);
      return copy.map(element => ({
        ...element,
        id: element.id,
        user: element.user,
        date: element.date,
      }));
    },
    ...mapState({
      allReservedBlocks: 'allReservedBlocks',
    }),
  },
  mounted() {
    this.$store.dispatch('getReservedBlocksAdmin');
  },
};
</script>

<style lang="less" scoped>
.basicText {
  color: #C4C4C4;
}
#header {
  background: #9AC356 !important;
  border: none !important;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.row {
  background: #D4EDAA;
  border-bottom: 1px solid white;
  width: 100vw;
  div {
    padding: 0 5px;
  }
}
#ids {
  padding-left: 10px;
}
#icon {
  text-align: right;
}
</style>
