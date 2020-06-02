<template>
  <div>

      <b-modal id="modal-1" title="Warning!">
    <p class="my-4">Are you sure you would like to deactivate your account?</p>
  </b-modal>

  <b-modal id="modal-2" title="Password Change">
    <b-form @submit.stop.prevent>
<label for="text-password">Current Password</label>
    <b-input type="password" id="text-password" aria-describedby="password-help-block"></b-input>
    <b-form-text id="password-help-block">
      Enter your current password in order to change it.
    </b-form-text>

    <label for="text-password">New Password</label>
    <b-input type="password" id="text-password" aria-describedby="password-help-block"></b-input>
    <b-form-text id="password-help-block">
      Your password must be 8-20 characters long, contain letters and numbers, and must not
      contain spaces, special characters, or emoji.
    </b-form-text>

    <label for="text-password">Confirm Password</label>
    <b-input type="password" id="text-password-confirm"
    aria-describedby="password-help-block"></b-input>
    <b-form-text id="password-help-block-confirm">
      Ensure that your passwords match
    </b-form-text>
   </b-form>
  </b-modal>


   <b-modal id="modal-3" title="Email Change">
    <b-form @submit.stop.prevent>
    <label for="text-password">Password</label>
    <b-input type="email" id="text-email" aria-describedby="email-help-block"></b-input>
    <b-form-text id="email-help-block">
      ....
    </b-form-text>

    <label for="text-email">Confirm Email</label>
    <b-input type="email" id="text-email-confirm"
    aria-describedby="email-help-block"></b-input>
    <b-form-text id="email-help-block-confirm">
      Ensure that your passwords match
    </b-form-text>
   </b-form>
  </b-modal>

<h3>{{ userData.firstName }} {{ userData.lastName }}</h3>
    <b-list-group flush="true">
      <b-list-group-item>Username: {{ userData.username }}</b-list-group-item>
      <b-list-group-item>Email: {{ userData.email }}</b-list-group-item>
      <b-list-group-item>Affiliated Team: {{ userTeam.name}}</b-list-group-item>

  <b-list-group-item><b-button v-b-modal.modal-3 block variant="primary">
    Change Email</b-button></b-list-group-item>
  <b-list-group-item><b-button v-b-modal.modal-2 block variant="primary">
    Change Password</b-button></b-list-group-item>
  <b-list-group-item><b-button v-b-modal.modal-1 block variant="danger">
    Deactivate Account</b-button></b-list-group-item>
</b-list-group>
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
  data() {
    return {
      userData: {
        firstName: 'Gabriel',
        lastName: 'Peter',
        username: 'gabepeter',
        email: 'peter.g@northeastern.edu',
      },
      userTeam: {
        name: 'TreeLuvrs',
      },
    };
  },
};
</script>

<style>

</style>
