<template>
  <div class="container">
    <img class="auth-logo" src="../assets/sftt-logo-text.jpg" />
    <h1>Sign up</h1>
    <b-form @submit="onSignUp">
      <b-form-group>
        <div class="form-row">
          <div class="col">
            <b-form-input
            id="input-first"
            v-model="firstName"
            type="text"
            required
            placeholder="FIRST NAME"
            ></b-form-input>
          </div>
          <div class="col">
            <b-form-input
            id="input-last"
            v-model="lastName"
            type="text"
            required
            placeholder="LAST NAME"
            ></b-form-input>
          </div>
        </div>
      </b-form-group>

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
          id="input-username"
          v-model="username"
          type="text"
          required
          placeholder="USERNAME"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          id="input-password"
          v-model="password[0]"
          type="password"
          required
          placeholder="PASSWORD"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          id="input-password-confirm"
          v-model="password[1]"
          type="password"
          required
          placeholder="CONFIRM PASSWORD"
        ></b-form-input>
      </b-form-group>

      <p>ALREADY HAVE AN ACCOUNT? <br>LOGIN <a href="./login">HERE!</a></p>

      <b-button type="submit">Sign Up</b-button>
    </b-form>
  </div>
</template>

<script>
import { signup } from '../auth/authAPI';

export default {
  name: 'SignupForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ['', ''],
      inputError: [],
      serverError: '',
    };
  },
  methods: {
    validate() {
      this.inputError = [];
      const err1 = this.validateUser();
      const err2 = this.validateEmail();
      const err3 = this.validatePassword();
      return err1 && err2 && err3;
    },
    validateUser() {
      if (!this.username) {
        this.inputError.push('Username cannot be empty');
      } else {
        return true;
      }
      return false;
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email) {
        this.inputError.push('Email cannot be empty');
      } else if (!emailRegex.test(this.email)) {
        this.inputError.push('Invalid email');
      } else {
        return true;
      }
      return false;
    },
    validatePassword() {
      if (!this.password[0] && !this.password[1]) {
        this.inputError.push('Password cannot be empty');
      } else if (this.password[0] !== this.password[1]) {
        this.inputError.push('Passwords do not match');
      } else {
        return true;
      }
      return false;
    },
    onSignUp(e) {
      e.preventDefault();
      this.submitted = true;
      this.serverError = '';
      if (this.validate()) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password[0],
          firstName: this.firstName,
          lastName: this.lastName,
        };
        try {
          signup(user);
          this.$router.push('/home');
        } catch (error) {
          if (error.status === 409) {
            this.serverError = 'Email has already been registered.';
          } else {
            this.serverError = 'Bad Request.';
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
  max-width: 75vw;
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
