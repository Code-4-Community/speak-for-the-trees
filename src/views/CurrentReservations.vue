<template>
<div>
  <div v-for="street in streets" :key="street.name" class="street-row">
      {{street.name}}
      <b-button>Complete</b-button>
      <b-button>Release</b-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'CurrentReservations',
  data: () => ({
    streets: [
      { name: 's', type: 'sss' },
      { name: 's', type: 'sss' },
      { name: 's', type: 'sss' },
      { name: 's', type: 'sss' },
    ],
  }),
};
</script>

<style>

</style>
