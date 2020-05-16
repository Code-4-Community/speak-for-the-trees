<template>
    <div>
        <p class="street-list" v-if="streets.length > 0">
            Currently selected: {{ this.streets.join(', ') }}
        </p>
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
  },
};
</script>

<style scoped>

</style>
