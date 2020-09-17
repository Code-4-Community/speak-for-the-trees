<template>
  <div>
    <h1>Completed Blocks</h1>
    <p
    v-if="allCompletedBlocks.length == 0"
    class="basicText">No blocks have been completed</p>
    <div v-else class="reservation-table">
      <b-row id="header" class="text-left">
        <b-col class="ids" cols="2">ID</b-col>
        <b-col cols="4">User</b-col>
        <b-col cols="4">Completion Date</b-col>
        <b-col cols="2" align-self="center"></b-col>
      </b-row>
      <b-row class="text-left" v-for="block in allCompletedBlocks" :key="block.fid">
        <b-col class="ids" cols="2" align-self="center">{{ block.id }}</b-col>
        <b-col cols="4" align-self="center">{{ block.username }}</b-col>
        <b-col cols="4" align-self="center">{{ formatDate(block.dateUpdated) }}</b-col>
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
            @click="resetToOpen(block.id)">
                Reset to open
            </b-dropdown-item>
            <b-dropdown-item
            @click="viewBlock(block.id)">
                View block
            </b-dropdown-item>
            </b-dropdown>
        </b-col>
      </b-row>
    </div>
    <b-button v-if="allCompletedBlocks.length > 0"
              class="download"
              @click="downloadBlocksCSV">
      Download Blocks CSV
    </b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  resetBlocks, getBlocksCSV,
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

    viewBlock(blockId) {
      this.$router.push({
        name: 'AdminMap',
        params: { activeBlockId: blockId },
      });
    },

    formatDate(date) {
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const [{ value: mo },,
        { value: da },,
        { value: ye }] = dtf.formatToParts(date);
      return `${mo}/${da}/${ye}`;
    },

    /**
     * Downloads a CSV that contains all Block/User information.
     */
    downloadBlocksCSV() {
      getBlocksCSV().then(resp => this.forceFileDownload(resp.data, 'Blocks Export Data'));
    },

    /**
     * Forces a download of the given data under the given file name.
     */
    forceFileDownload(data, fileName) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

.reservation-table {
  box-sizing: border-box;
  width: 100vw;
}

#header {
  background: #9AC356 !important;
  border: none !important;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  font-weight: bold;
}
.row {
  background: #D4EDAA;
  border-bottom: 1px solid white;
  div {
    padding: 0 5px;
    text-align: center;
  }
}
.ids {
  padding-left: 10px;
}
#icon {
  text-align: right;
  padding-right: 20px;
}
button.download, button.download:hover, button.download:focus {
  background: #9AC356;
  color: white;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  margin: 1rem 5vw 0 0;
  float: right;
}
</style>
