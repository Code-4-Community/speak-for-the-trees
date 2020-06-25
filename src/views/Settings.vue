<template>
  <div>

  <b-modal @ok="deactivateAccount" id="modal-1" title="Warning!">
    <p class="my-4">Are you sure you would like to deactivate your account?</p>
  </b-modal>

  <b-modal @ok="changePassword" id="modal-2" title="Password Change">
    <b-form @submit.stop.prevent>
<label for="text-password">Current Password</label>
    <b-input
    v-model="passwords.currentPassword"
    type="password"
    id="text-password"
    aria-describedby="password-help-block"></b-input>
    <b-form-text id="password-help-block">
      Enter your current password in order to change it.
    </b-form-text>

    <label for="text-password">New Password</label>
    <b-input
    v-model="passwords.newPassword"
    type="password"
    id="text-password"
    aria-describedby="password-help-block"></b-input>
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


   <b-modal @ok="changeEmail" id="modal-3" title="Email Change">
    <b-form @submit.stop.prevent>
    <label for="text-password">Enter Password</label>
    <b-input type="password" id="text-password" aria-describedby="password-help-block"
    v-model="changeEmailRequest.password"></b-input>
    <b-form-text id="email-help-block">
      ....
    </b-form-text>

    <label for="text-email">New Email</label>
    <b-input type="email" id="text-email-confirm"
    aria-describedby="email-help-block" v-model="changeEmailRequest.newEmail"></b-input>
   </b-form>
  </b-modal>

    <page-title :title="fullName" />
    <b-list-group :flush='true'>
      <b-list-group-item>Username: {{ userData.username }}</b-list-group-item>
      <b-list-group-item>Email: {{ userData.email }}</b-list-group-item>

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
import {
  changePassword, changeEmail, deleteUser,
} from '../api/api';
import PageTitle from '../components/PageTitle.vue';

export default {
  name: 'Profile',
  components: {
    PageTitle,
  },
  computed: {
    ...mapState({
      userData: 'userData',
    }),
    fullName() {
      return `${this.userData.firstName} ${this.userData.lastName}`;
    },
  },
  data() {
    return {
      passwords: {
        currentPassword: '',
        newPassword: '',
      },
      changeEmailRequest: {
        password: '',
        newEmail: '',
      },
    };
  },
  methods: {
    changePassword() {
      changePassword(this.passwords).then(() => {
        // eslint-disable-next-line
        alert('Successfully changed password!')
      }).catch((error) => {
        // eslint-disable-next-line
        alert(`Failed to change password: ${error}`);
      }).finally(() => {
        this.passwords = {
          currentPassword: '',
          newPassword: '',
        };
      });
    },
    changeEmail() {
      changeEmail(this.changeEmailRequest).then(() => {
        // eslint-disable-next-line
        alert("Successfully changed your email!");
        this.$store.dispatch('getUserData');
      }).catch((error) => {
        // eslint-disable-next-line
        alert(`Failed to change your email: ${error}`);
      }).finally(() => {
        this.changeEmailRequest = {
          password: '',
          newEmail: '',
        };
      });
    },
    deactivateAccount() {
      deleteUser().then(() => {
        // eslint-disable-next-line
        alert("Your account has been deactivated");
        this.$router.push('/login');
      }).catch(() => {
        // eslint-disable-next-line
        alert("Failed to deactivate your account");
      });
    },
  },
};
</script>

<style>

</style>
