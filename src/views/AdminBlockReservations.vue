<template>
<div>
    <h1>All reservations</h1>
    <p
    v-if="reservedBlocks.length == 0"
    class="basicText">There are currently no reservations</p>
    <b-container>
        <b-row>
            <b-col>Block ID</b-col>
            <b-col>User</b-col>
            <b-col>Reservation date</b-col>
            <b-col></b-col>
        </b-row>
        <b-row v-for="block in reservedBlocks" :key="block">
            <b-col>{{ block.id }}</b-col>
            <b-col>{{ block.user }}</b-col>
            <b-col>{{ block.date }}</b-col>
            <b-col>
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
    </b-container>
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
        { id: 1, user: 'bob', date: '6-12-2020' },
        { id: 2, user: 'marc', date: '6-13-2020' },
        { id: 3, user: 'dan', date: '6-10-2020' },
        { id: 4, user: 'alec', date: '6-11-2020' },
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
};
</script>

<style lang="less" scoped>
.row {
    background: #D4EDAA;
    border: 1px solid white;
    width: 98vw;
}
</style>
