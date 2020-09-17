<template>
  <div>
    <page-title :returnButton="true" :title="'Current Reservations'" :subtitle="subtitle" />
    <div class="blockContainer" v-for="block in reservedBlocks" :key="block">
      <p class="block">{{ block }}</p>
      <b-dropdown size="sm" dropleft variant="link" toggle-class="text-decoration-none" no-caret>
        <template v-slot:button-content>
          <img src="../assets/ellipsis-icon.svg" alt="actions" />
        </template>
        <b-dropdown-item
        @click="completeBlock(block)">
          Complete
        </b-dropdown-item>
        <b-dropdown-item
        @click="releaseBlock(block)">
          Release
        </b-dropdown-item>
        <b-dropdown-item
        @click="viewReservation(block)">
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
import PageTitle from '../components/PageTitle.vue';

export default {

  name: 'CurrentReservations',
  components: {
    PageTitle,
  },
  computed: {
    ...mapState({
      reservedBlocks: 'reservedBlocks',
    }),
    subtitle() {
      return this.reservedBlocks.length === 0 ? 'You currently don\'t have any reservations' : '';
    },
  },

  methods: {

    // sends to the user to the map to edit a reservation
    viewReservation(id) {
      this.$router.push({
        name: 'ReserveEdit',
        params: { activeBlockId: id, editmode: 'edit' },
      });
    },

    completeBlock(block) {
      finishBlocks({ blocks: [block] }).then(() => {
        this.$bvToast.toast(`Successful completion of ${block}`);
        return getReservedBlocks();
      }).then((reservedBlocks) => {
        this.reservedBlocks = reservedBlocks.data;
      }).catch(() => {
        this.$bvToast.toast(`Error in completion of ${block}.`);
      });
    },

    releaseBlock(block) {
      releaseBlocks({ blocks: [block] }).then(() => {
        this.$bvToast.toast(
          `Successful release of ${block}. You are no longer responsible for this block`,
        );
        return getReservedBlocks();
      }).then((reservedBlocks) => {
        this.reservedBlocks = reservedBlocks.data;
      }).catch(() => {
        this.$bvToast.toast(`Error in releasing of ${block}.`);
      });
    },
  },

  mounted() {
    this.$store.dispatch('getReservedBlocks');
  },
};
</script>

<style scoped lang="less">
.blockContainer {
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
