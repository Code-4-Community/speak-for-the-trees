<template>
<div>
  <h1>All reservations</h1>
  <p
  v-if="reservedBlocks.length == 0"
  class="basicText">There are currently no reservations</p>
    <b-row id="header" class="text-center">
      <b-col cols="2">ID</b-col>
      <b-col cols="4">User</b-col>
      <b-col cols="4">Reservation date</b-col>
      <b-col cols="2" align-self="start"></b-col>
    </b-row>
    <b-row class="text-center" cols="14" v-for="block in sortedBlocks" :key="block">
      <b-col cols="2" align-self="center">{{ block.id }}</b-col>
      <b-col cols="4" align-self="center">{{ block.user }}</b-col>
      <b-col cols="4" align-self="center">{{ block.date }}</b-col>
      <b-col cols="2" align-self="center">
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
          @click="resetToOpen(block)">
              Reset to open
          </b-dropdown-item>
          <b-dropdown-item
          @click="completeBlock(block)">
              Complete
          </b-dropdown-item>
          <b-dropdown-item
          @click="viewReservation(block)">
              View reservation
          </b-dropdown-item>
          </b-dropdown>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  finishBlocks, releaseBlocks,
} from '../api/api';

export default {
  name: 'AdminBlockReservations',
  data() {
    return {
      reservedBlocks: [
        { id: 1000, user: 'bobbobbob', date: '6-12-2020' },
        { id: 2000, user: 'marc', date: '12-13-2020' },
        { id: 3000, user: 'dandandan', date: '6-1-2020' },
        { id: 4000, user: 'alec', date: '6-11-2020' },
      ],
    };
  },
  methods: {
    resetToOpen(block) {
      releaseBlocks({ blocks: [block.id] }).then(() => {
        this.$bvToast.toast(
          `Successful opening of ${block.id}.`,
        );
        //     return getReservedBlocks();
        //   }).then((reservedBlocks) => {
        //     this.reservedBlocks = reservedBlocks.data;
      }).catch(() => {
        this.$bvToast.toast(`Error in opening of ${block.id}.`);
      });
    },
    completeBlock(block) {
      finishBlocks({ blocks: [block.id] }).then(() => {
        this.$bvToast.toast(`Successful completion of ${block.id}`);
        //     return getReservedBlocks(); replace with call for all blocks
        //   }).then((reservedBlocks) => {
        //     this.reservedBlocks = reservedBlocks.data;
      }).catch(() => {
        this.$bvToast.toast(`Error in completion of ${block.id}.`);
      });
    },
    viewReservation(block) {
      this.$router.push({
        name: 'ReserveEdit',
        params: { activeStreetFid: block.id, editmode: 'edit' },
      });
    },
  },
  computed: {
    sortedBlocks() {
      const copy = this.reservedBlocks;
      copy.sort((a, b) => a.date < b.date);
      return copy.map(element => ({
        ...element,
        id: element.id,
        user: element.user,
        date: element.date,
      }));
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>
