<template>
  <div class="container">
    <img class="auth-logo" src="../../assets/sftt-logo-text.jpg" />
    <h1>Login</h1>
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

      <a href="">FORGOT PASSWORD?<br><br></a>

      <p>NEW TO SPEAK FOR THE TREES?<br> SIGN UP <a href="./sign-up">HERE!</a></p>

      <b-button @submit="submit" type="submit" variant="primary">Submit</b-button>
    </b-form>
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
.container {
  text-align: left;
}

.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
