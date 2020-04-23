<template>
  <div>
    <img class="auth-logo" src="../../assets/sftt-logo-text.jpg" />
    <b-form>
      <b-form-group>
        <b-form-input
          id="input-username"
          v-model="username"
          type="text"
          required
          placeholder="Username"
        ></b-form-input>
        </b-form-group>
<b-form-group
          id="input-group-1"
        label-for="input-1"
        description="We'll never share your email with anyone else."
        >
        <b-form-input
          id="input-email"
          v-model="email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
        </b-form-group>
<b-form-group>
        <b-form-input
          id="input-password"
          v-model="password[0]"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
        </b-form-group>
<b-form-group>
        <b-form-input
          id="input-password-confirm"
          v-model="password[1]"
          type="password"
          required
          placeholder="Confirm Password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-remember-login">
        <b-form-checkbox-group v-model="rememberLogIn" id="checkboxes-4">
          <b-form-checkbox value="">Remember for next time?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
  <!-- <div>
    <img class="auth-logo" src="../../assets/sftt-logo-text.jpg" />
    <h1> Sign Up </h1>
    <div class="auth-container">
      <input v-model="username" type="text" placeholder="USERNAME">
      <input v-model="email" type="text" placeholder="EMAIL">
      <input v-model="password[0]" type="password" placeholder="PASSWORD">
      <input v-model="password[1]" type="password" placeholder="CONFIRM PASSWORD">
    </div>
    <ul class="error">
      <li v-for="(err, index) in inputError" :key="index"> {{err}} </li>
      <li v-if="this.serverError"> {{this.serverError}} </li>
    </ul>
    <div class="options">
      <label for="signUpForNewsLetter"> SIGN UP FOR SFFT NEWSLETTER?</label>
      <input type="checkbox" id="signUpForNewsLetter" v-model="signUpForNewsLetter">
      <label for="rememberLogIn"> REMEMBER LOG-IN INFORMATION </label>
      <input type="checkbox" id="rememberLogIn" v-model="rememberLogIn">
    </div>
    <button @click="signup"> Signup </button>
  </div> -->
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      email: '',
      password: ['', ''],
      inputError: [],
      serverError: '',
      signUpForNewsLetter: false,
      rememberLogIn: false,
    };
  },
  methods: {
    resetInput() {
      this.username = '';
      this.email = '';
      this.password = ['', ''];
      this.inputError = [];
      this.serverError = '';
    },
    validate() {
      this.inputError = [];
      const err1 = this.validateUser();
      const err2 = this.validateEmail();
      const err3 = this.validatePassword();
      return err1 && err2 && err3;
    },
    validateUser() {
      if (!this.username) {
        this.inputError.push('User name cannot be empty');
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
        this.inputError.push('Invalid Email');
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
    async signup() {
      this.submitted = true;
      this.serverError = '';
      if (this.validate()) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password[0],
          signUpForNewsLetter: this.signUpForNewsLetter,
          rememberLogIn: this.rememberLogIn,
        };
        try {
          await this.$store.dispatch('signup', user);
          this.resetInput();
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
