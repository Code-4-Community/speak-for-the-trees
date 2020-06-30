<template>
  <div class="auth-container">
    <img class="auth-logo" src="../assets/sftt-logo-text.jpg" />
    <h1>Login</h1>
    <b-form @submit="onLogin">
      <b-form-group class="form-row">
        <b-form-input
          class="auth-input"
          id="input-email"
          v-model="email"
          type="email"
          required
          placeholder="EMAIL"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="form-row">
        <b-form-input
          class="auth-input"
          id="input-password"
          v-model="password"
          type="password"
          required
          placeholder="PASSWORD"
        ></b-form-input>
      </b-form-group>

      <!-- <b-form-group id="input-remember-login">
        <b-form-checkbox-group id="checkboxes-4">
          <b-form-checkbox v-model="rememberLogIn">Remember for next time?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->

      <b-alert v-model="error" variant="danger" dismissible>
        {{ errorMessage }}
      </b-alert>

      <p class="auth-footer">NEW TO SPEAK FOR THE TREES?
      <br>SIGN UP <router-link class="footer-link" to="/signup">HERE!</router-link></p>

      <b-button class="auth-submit" type="submit">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { login } from '../auth/authAPI';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
      inputValid: false,
      rememberLogIn: false,
      error: false,
      errorMessage: '',
    };
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser',
    }),
    validateInput() {
      this.inputValid = this.email && this.password;
      return this.inputValid;
    },
    onLogin(e) {
      e.preventDefault();
      this.submitted = true;
      if (this.validateInput()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        login(user)
          .then(() => {
            this.setUser();
            this.$router.push('/');
            this.$store.dispatch('getUserData');
          })
          .catch(() => {
            this.error = true;
            this.errorMessage = 'Sorry, we were unable to verify your account';
          });
      }
    },
  },
};
</script>

<style scoped>
.form-row {
  display: block;
}
</style>
