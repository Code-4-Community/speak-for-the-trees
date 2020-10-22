<template>
  <div class="auth-container">
    <img class="auth-logo" src="../assets/sftt-logo-text.jpg" />
    <h1>Reset Password</h1>
    <b-form @submit="onReset">
        <b-form-group>
            <b-form-input
            class="auth-input"
            id="input-password"
            v-model="password[0]"
            type="password"
            required
            placeholder="NEW PASSWORD"
            ></b-form-input>
        </b-form-group>

        <b-form-group>
            <b-form-input
            class="auth-input"
            id="input-password-confirm"
            v-model="password[1]"
            type="password"
            required
            placeholder="CONFIRM PASSWORD"
            ></b-form-input>
        </b-form-group>

          <p class="auth-footer">
              REMEBER YOUR PASSWORD?
              <br>LOGIN <router-link class="footer-link" to="/login">HERE!</router-link>
          </p>

        <b-button class="auth-submit" type="submit">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  resetPassword,
} from '../api/api';

Vue.use(VueRouter);

export default {
  name: 'forgotPassword',
  data() {
    return {
      password: ['', ''],
    };
  },
  methods: {
    validatePassword() {
      if (this.password[0].length < 8) {
        this.$bvToast.toast('Your password is too short');
        return false;
      }
      if (this.password[0] !== this.password[1]) {
        this.$bvToast.toast('Your passwords do not match');
        return false;
      }
      return true;
    },
    onReset(e) {
      e.preventDefault();
      if (this.validatePassword()) {
        const data = {
          secretKey: this.$route.params.token,
          newPassword: this.password[0],
        };
        resetPassword(data)
          .then(() => {
            this.$router.push({
              name: 'Login',
            });
          })
          .catch((error) => {
            this.$bvToast.toast(`Error: ${error.message}`);
          });
      }
    },
  },
};
</script>

<style scoped>
</style>
