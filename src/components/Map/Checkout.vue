<template>
  <div>
    <table>
      <tr v-for="street in streets" :key="street.id">
        <td>{{ street.name }}</td>
        <td><button @click="remove(street.id)">(Remove)</button></td>
      </tr>
    </table>

    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Checkout',
  computed: {
    ...mapGetters({
      streets: 'getStreets',
    }),
  },
  methods: {
    checkout() {
      console.log(this.streets);
    },
    ...mapMutations({
      remove: 'removeStreet', // removes a street by ID
    }),
  },
};
</script>
