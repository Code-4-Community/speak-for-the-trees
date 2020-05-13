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

      <a href="">FORGOT PASSWORD?<br><br></a>

      <p>NEW TO SPEAK FOR THE TREES?<br>SIGN UP
        <a href="./sign-up">HERE!</a>
      </p>

      <b-button type="submit">Login</b-button>
    </b-form>
  </div>
</template>

<script>
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
      error: '',
    };
  },
  methods: {
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
        try {
          login(user);
          this.$router.push('/');
        } catch (error) {
          if (error.status === 401) {
            this.error = `Incorrect Email/Password: ${error.message}.`;
          } else {
            this.error = 'Bad request.';
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: left;
  min-width: 75vw;
}

p {
  font-size: 10px;
  color: #AFAEAE;
}

a {
  font-size: 10px;
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
