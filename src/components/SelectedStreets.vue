<template>
  <div>
    <div>
      <b-button id="block-popover">{{this.title}} Block List</b-button>
      <b-popover target="block-popover" placement="bottom" title="Block List" width="">
        <div class="blockListContainer" >
          <span v-for="block in streets" :key="block" class="activeBlock">
            <p> {{ block }} </p>
            <span class="xIcon" @click="removeBlock(block)">
              X
            </span>
          </span>
        </div>
      </b-popover>
    </div>
    <b-button v-on:click="this.onClick" :disabled="streets.length === 0">
        {{this.title}}
    </b-button>
  </div>
</template>

<script>

export default {
  name: 'SelectedStreets',
  props: {
    onClick: {
      type: Function,
    },
    streets: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
    },
    setBlocks: {
      type: Function,
    },
  },
  methods: {
    removeBlock(block) {
      const arr = this.streets.slice();
      const index = arr.indexOf(block);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      this.setBlocks(arr);
    },
  },
};
</script>

<style scoped>
  .blockListContainer {
    display: flex;
    width: 210px;
    flex-wrap: wrap;
  }

  .activeBlock {
    display: flex;
    background: #D4EDAA;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px;
    height: 25px;
    font-size: 16px;
  }

  .xIcon {
    opacity: 0.6;
    cursor: pointer;
    margin-left: 5px;
    color: black;
    font-weight: bold;
  }

  .xIcon:hover {
    opacity: 1;
  }
</style>
