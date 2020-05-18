<template>
  <div class="container">
    <img class="auth-logo" src="../assets/sftt-logo-text.jpg" />
    <h1>Login</h1>
    <b-form @submit="onLogin">
      <b-form-group>
        <b-form-input
          id="input-email"
          v-model="email"
          type="email"
          required
          placeholder="EMAIL"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
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

      <p>NEW TO SPEAK FOR THE TREES?
      SIGN UP <router-link class="link" to="/signup">HERE!</router-link></p>

      <b-button type="submit">Login</b-button>
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
            this.$store.dispatch('getUserTeam');
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
.auth-logo {
  width: 204px;
  height: 168px;
  display: block;
  margin: auto;
  margin-bottom: 10%;
}
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  margin-top: 10%;
  text-align: left;
  min-width: 75vw;
}

p {
  font-size: 12px;
  color: #AFAEAE;
}

.link {
  font-size: 12px;
  color: #61802E;
}

input.form-control {
  height: 1.5rem;
  border: 2px solid #C4C4C4;
  border-radius: 5px;
}

input.form-control::placeholder, textarea.form-control::placeholder {
  color: #E5E5E5;
}

button {
  background: #61802E;
  padding: 0.5rem 2rem 0.5rem 2rem;
  border-radius: 5px;
  border: none;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
