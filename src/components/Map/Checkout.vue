<template>
  <div>
    <table>
      <tr v-for="street in streets" :key="street.id">
        <td>{{ street.name }}</td>
        <td>Remove</td>
      </tr>
    </table>

    <button>Checkout</button>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  computed: {
    streets() {
      return [
        {
          id: 0,
          name: 'Street 1',
        },
        {
          id: 1,
          name: 'Street 2',
        },
      ];
    },
  },
};
</script>
