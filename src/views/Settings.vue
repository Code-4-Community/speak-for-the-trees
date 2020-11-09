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
      Enter your current password in order to change it
    </b-form-text>

    <label for="text-password">New Password</label>
    <b-input
    v-model="passwords.newPassword"
    type="password"
    id="text-password"
    aria-describedby="password-help-block"></b-input>
    <b-form-text id="password-help-block">
      Your password must be at least 8 characters long and contain letters and numbers
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

    <label for="text-email">New Email</label>
    <b-input type="email" id="text-email-confirm"
    aria-describedby="email-help-block" v-model="changeEmailRequest.newEmail"></b-input>
   </b-form>
  </b-modal>
    <b-modal @ok="changeUsername" id="modal-4" title="Username Change">
      <b-form @submit.stop.prevent>
        <label for="text-password-username">Enter Password</label>
        <b-input type="password" id="text-password-username"
                 aria-describedby="password-help-block-username"
                 v-model="changeUsernameRequest.password"></b-input>
        <b-form-text id="password-help-block-username">
          Enter your current password in order to change your username
        </b-form-text>

        <label for="text-username">New Username</label>
        <b-input type="text" id="text-username"
                 aria-describedby="username-help-block"
                 v-model="changeUsernameRequest.newUsername"/>
        <b-form-text id="username-help-block">
          Enter a new username that is not already in use
        </b-form-text>
      </b-form>
    </b-modal>

    <b-modal @ok="addAdmin" id="modal-5" title="Add Admin">
      <b-form @submit.stop.prevent>
        <label for="new-admin-email">Add Admin Email</label>
        <b-input type="email" id="new-admin-email"
                 aria-describedby="new-admin-help-block-email"
                 v-model="makeNewAdminRequest.newAdminEmail"></b-input>
        <b-form-text id="new-admin-help-block-email">
          Enter a the new Admin's email
        </b-form-text>
        <label for="admin-password">Your Password</label>
        <b-input type="password" id="admin-password"
                 aria-describedby="admin-password-help-block"
                 v-model="makeNewAdminRequest.password"></b-input>
        <b-form-text id="admin-password-help-block">
          Enter your password to verify it is you.
        </b-form-text>
      </b-form>
    </b-modal>


<h3>{{ userData.firstName }} {{ userData.lastName }}</h3>
    <b-list-group :flush='true'>
      <b-list-group-item>Username: {{ userData.username }}</b-list-group-item>
      <b-list-group-item>Email: {{ userData.email }}</b-list-group-item>

  <b-list-group-item>
    <b-button class="standardButton" v-b-modal.modal-3 block>
    Change Email
    </b-button>
  </b-list-group-item>
  <b-list-group-item>
    <b-button class="standardButton" v-b-modal.modal-4 block>
      Change Username
    </b-button>
  </b-list-group-item>
  <b-list-group-item>
    <b-button class="standardButton" v-b-modal.modal-2 block>
    Change Password
    </b-button>
  </b-list-group-item>
  <b-list-group-item v-if="isAdmin">
    <b-button v-b-modal.modal-5 block variant="danger">
      Add New Admin
    </b-button>
  </b-list-group-item>
  <b-list-group-item v-if="!isAdmin">
    <b-button v-b-modal.modal-1 block variant="danger">
    Deactivate Account
    </b-button>
  </b-list-group-item>
  </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  changePassword, changeEmail, deleteUser, changeUsername, makeUserAdmin,
} from '../api/api';
import constants from '../auth/constants';

export default {

  name: 'Profile',

  computed: {

    ...mapState({
      userData: 'userData',
      privilegeLevel: 'privilegeLevel',
    }),

    isAdmin() {
      return this.privilegeLevel === constants.ADMIN;
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
      changeUsernameRequest: {
        password: '',
        newUsername: '',
      },
      makeNewAdminRequest: {
        newAdminEmail: '',
        password: '',
      },
    };
  },

  methods: {

    changePassword() {
      changePassword(this.passwords).then(() => {
        this.$bvToast.toast('Successfully changed password!');
      }).catch((error) => {
        this.$bvToast.toast(`Failed to change password: ${error}`);
      }).finally(() => {
        this.passwords = {
          currentPassword: '',
          newPassword: '',
        };
      });
    },

    changeEmail() {
      changeEmail(this.changeEmailRequest).then(() => {
        this.$bvToast.toast('Successfully changed email!');
        this.$store.dispatch('getUserData');
      }).catch((error) => {
        this.$bvToast.toast(`Failed to change your email: ${error}`);
      }).finally(() => {
        this.changeEmailRequest = {
          password: '',
          newEmail: '',
        };
      });
    },

    changeUsername() {
      changeUsername(this.changeUsernameRequest).then(() => {
        this.$bvToast.toast('Successfully changed username!');
        this.$store.dispatch('getUserData');
      }).catch((error) => {
        const errorMsg = error.response?.data || error;
        this.$bvToast.toast(`Failed to change your username: ${errorMsg}`);
      }).finally(() => {
        this.changeUsernameRequest = {
          password: '',
          newUsername: '',
        };
      });
    },

    deactivateAccount() {
      deleteUser().then(() => {
        this.$bvToast.toast('Your account has been deactivated');
        this.$router.push('/login');
      }).catch(() => {
        this.$bvToast.toast('Failed to deactivate your account');
      });
    },

    addAdmin() {
      makeUserAdmin(this.makeNewAdminRequest).then(() => {
        this.$bvToast.toast('Successfully created new admin!');
        this.$store.dispatch('getUserData');
      }).catch((error) => {
        const errorMsg = error.response?.data || error;
        this.$bvToast.toast(`Failed to create new admin: ${errorMsg}`);
      }).finally(() => {
        this.makeNewAdminRequest = {
          newAdminEmail: '',
          password: '',
        };
      });
    },
  },
};
</script>

<style scoped lang="less">
button.standardButton, button.standardButton:hover, button.standardButton:focus {
  background: #9AC356;
  border-color: #9AC356;
  box-shadow: none;
}
</style>
