<template>
  <div>
    <h3>Full Name</h3>
    <b-list-group flush="true">
      <b-list-group-item>Username:</b-list-group-item>
      <b-list-group-item>Email: </b-list-group-item>
      <b-list-group-item>Segments Completed: </b-list-group-item>
      <b-list-group-item>Affiliated Teams: </b-list-group-item>
    </b-list-group>
    <b-button pressed="true" block="true" variant="danger">Delete Account</b-button>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {
  },
};
</script>

<style>

</style>
