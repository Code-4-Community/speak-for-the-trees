<template>
  <div class="list-action-row">
    <div class="list-button">
      <b-button
        class="trigger"
        :id="title"
        @click="popoverToggle = !popoverToggle"
        :disabled="streets.length === 0">
        {{this.title}} Block List
      </b-button>
      <b-popover
        :target="title"
        :show.sync="showPopover"
        triggers="manual"
        placement="bottom"
        title="Block List"
        width="">
        <div class="block-list-container">
          <span v-for="block in streets" :key="block" class="active-block">
            <p> {{ block }} </p>
            <span class="x-icon" @click="removeBlock(block)">
              X
            </span>
          </span>
        </div>
        <div class="popover-footer">
          <b-button class="trigger" v-on:click="this.onClick" :disabled="streets.length === 0">
              {{this.title}}
          </b-button>
        </div>
      </b-popover>
    </div>
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
  data() {
    return {
      popoverToggle: false,
    };
  },
  methods: {
    removeBlock(block) {
      const arr = this.streets.slice();
      const index = arr.indexOf(block);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      if (arr.length === 0) {
        this.popoverToggle = false;
      }
      this.setBlocks(arr);
    },
  },
  computed: {
    showPopover() {
      return this.popoverToggle && this.streets.length > 0;
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
