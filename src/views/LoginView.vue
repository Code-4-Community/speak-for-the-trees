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

      <b-alert v-model="error" variant="danger" dismissible>
        {{ errorMessage }}
      </b-alert>

      <p class="auth-footer">
        NEW TO SPEAK FOR THE TREES?
        <br>SIGN UP <router-link class="footer-link" to="/signup">HERE!</router-link>
      </p>

      <b-button id="button-link" v-b-modal.modal-1 block>
        FORGOT YOUR PASSWORD?
      </b-button>

      <b-button class="auth-submit" type="submit">Login</b-button>
    </b-form>

    <b-modal @ok="requestPassword" id="modal-1" title="Request a New Password">
      <b-form @submit.stop.prevent>
        <label>Enter Your Email</label>
        <b-input type="email" v-model="requestEmail"></b-input>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { login } from '../auth/authAPI';
import { forgotPassword } from '../api/api';

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
      requestEmail: '',
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
            this.$router.push({
              name: 'Home',
              params: { firstLogIn: false },
            });
            this.$store.dispatch('getUserData');
          })
          .catch(() => {
            this.error = true;
            this.errorMessage = 'Sorry, we were unable to verify your account';
          });
      }
    },

    requestPassword() {
      const email = {
        email: this.requestEmail,
      };
      forgotPassword(email).then(() => {
        this.$bvToast.toast('Check your email to reset your password');
      }).catch(() => {
        this.$bvToast.toast('There is no account associated with that email address');
      });
    },
  },
};
</script>

<style scoped>
.form-row {
  display: block;
}
#button-link {
  font-size: 12px;
  color: #61802E;
  background: none;
  border: none;
  text-align: left;
  padding: 0;
  margin-bottom: 1rem;
}
</style>
