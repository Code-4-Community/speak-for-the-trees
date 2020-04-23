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

<b-form-group>
        <b-form-input
          id="input-password"
          v-model="password"
          type="password"
          required
          placeholder="Password"
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
    <!-- <img class="auth-logo" src="../../assets/sftt-logo-text.jpg" />
    <h1>Sign in</h1>
    <div class="auth-container">
      <input v-model="email" @focus="resetSubmit" type="text" placeholder="Email Address" />
      <input v-model="password" @focus="resetSubmit" type="password" placeholder="Password"/>
    </div>
    <div class="error">
      <p v-if="submitted && !inputValid"> Enter an email and password </p>
      <p v-if="submitted && error">{{error}}</p>
    </div>
    <div class="options">
      <label for="rememberLogIn"> REMEMBER LOG-IN INFORMATION </label>
      <input type="checkbox" id="rememberLogIn" v-model="rememberLogIn">
    </div>
    <button @click="submit"> Login </button>
    <div class="links">
      <a href="/"> FORGOT USERNAME? </a>
      <a href="/"> FORGOT PASSWORD? </a>
      <router-link to="sign-up" tag="a"> NEW TO SPEAK FOR THE TREES? SIGN UP HERE! </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: '',
      submitted: false,
      inputValid: false,
      rememberLogIn: false,
      error: '',
    };
  },
  methods: {
    resetInput() {
      this.email = '';
      this.password = '';
      this.resetSubmit();
    },
    resetSubmit() {
      this.submitted = false;
      this.error = '';
    },
    validateInput() {
      this.inputValid = this.email && this.password;
      return this.inputValid;
    },
    async submit() {
      this.submitted = true;
      if (this.validateInput()) {
        const user = {
          email: this.email,
          password: this.password,
          rememberLogIn: this.rememberLogIn,
        };
        try {
          await this.$store.dispatch('login', user);
          this.resetInput();
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

<style>
.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
