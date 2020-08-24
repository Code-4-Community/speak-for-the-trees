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
    </b-form>
    <p class="auth-footer">
        REMEBER YOUR PASSWORD?
        <br>LOGIN <router-link class="footer-link" to="/login">HERE!</router-link>
    </p>
    <b-button class="auth-submit" type="submit">Reset</b-button>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
//   changePassword,
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
    onReset(e) {
      e.preventDefault();
      if (this.password[0] === this.password[1]) {
        // const pw = {
        //   password: this.password[0],
        // };
      } else {
        this.error = true;
        this.errorMessage = 'Your passwords do not match';
      }
    },
  },
};
</script>

<style scoped>
</style>
