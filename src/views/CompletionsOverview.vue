<template>
  <div>
    <h1>Completed Blocks</h1>
    <p
    v-if="allCompletedBlocks.blocks.length == 0"
    class="basicText">No blocks have been completed</p>
    <b-row v-else id="header" class="text-left">
      <b-col id="ids" cols="2">ID</b-col>
      <b-col cols="4">User</b-col>
      <b-col cols="4">Completion Date</b-col>
      <b-col cols="2" align-self="center"></b-col>
    </b-row>
    <b-row class="text-left" v-for="block in allCompletedBlocks.blocks" :key="block.fid">
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
          @click="viewBlock(block.fid)">
              View block
          </b-dropdown-item>
          </b-dropdown>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  resetBlocks,
} from '../api/api';

export default {
  name: 'CompletionsOverview',
  methods: {
    resetToOpen(block) {
      resetBlocks({ blocks: [block] }).then(() => {
        this.$store.dispatch('getCompletedBlocksAdmin');
      }).catch(() => {
        this.$bvToast.toast(`Error in opening of ${block}.`);
      });
    },
    viewBlock(block) {
      this.$router.push({
        name: 'ReserveEdit',
        params: { activeStreetFid: block, editmode: 'edit' },
      });
    },
  },
  computed: {
    ...mapState({
      allCompletedBlocks: 'allCompletedBlocks',
    }),
  },
  mounted() {
    this.$store.dispatch('getCompletedBlocksAdmin');
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
