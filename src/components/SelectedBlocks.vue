<template>
  <div class="list-action-row">
    <div class="list-button">
      <b-button
        class="trigger"
        :id="title"
        @click="popoverToggle = !popoverToggle"
        :disabled="blocks.length === 0">
        {{this.title}} Block List
      </b-button>
      <b-popover
        :target="title"
        :show.sync="displayPopover"
        triggers="manual"
        placement="bottom"
        title="Block List"
        width="">
        <div class="block-list-container">
          <span v-for="block in blocks" :key="block" class="active-block">
            <p> {{ block }} </p>
            <span class="x-icon" @click="removeBlock(block)">
              X
            </span>
          </span>
        </div>
        <div class="popover-footer">
          <b-button class="trigger" v-on:click="this.onClick" :disabled="blocks.length === 0">
              {{this.title}}
          </b-button>
        </div>
      </b-popover>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SelectedBlocks',
  props: {
    onClick: {
      type: Function,
    },
    blocks: {
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
  data() {
    return {
      popoverToggle: false,
    };
  },
  computed: {
    displayPopover() {
      return this.popoverToggle && this.blocks.length > 0;
    },
  },
  methods: {
    // Removes the given block from the given array of blocks and calls the
    // setBlocks callback with the new array
    removeBlock(block) {
      const self = this;
      const arr = this.blocks.slice();
      const index = arr.indexOf(block);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      if (arr.length === 0) {
        self.popoverToggle = false;
      }
      self.setBlocks(arr);
    },
  },
};
</script>

<style scoped>
  .list-action-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .list-button {
    padding-right: 10px;
  }

  .popover-footer {
    display: flex;
    flex-direction: row-reverse;
  }

  button.trigger, button.trigger:hover, button.trigger:focus{
    background: #9AC356;
    color: white;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .block-list-container {
    display: flex;
    width: 210px;
    flex-wrap: wrap;
  }

  .active-block {
    display: flex;
    background: #D4EDAA;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 5px;
    height: 25px;
    font-size: 16px;
  }

  .x-icon {
    opacity: 0.6;
    cursor: pointer;
    margin-left: 5px;
    color: black;
    font-weight: bold;
  }

  .x-icon:hover {
    opacity: 1;
  }
</style>
