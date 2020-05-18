<template>
  <div>
    <h3>{{ userData.firstName }} {{ userData.lastName }}</h3>
    <b-list-group flush="true">
      <b-list-group-item>Username: {{ userData.username }}</b-list-group-item>
      <b-list-group-item>Email: {{ userData.email }} </b-list-group-item>
      <b-list-group-item>Affiliated Team: {{ userTeam.name}}  </b-list-group-item>
    </b-list-group>
    <b-button pressed="true" block="true" variant="danger">Delete Account</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapState({
      userData: 'userData',
      userTeam: 'userTeam',
    }),
  },
};
</script>

<style>

</style>
