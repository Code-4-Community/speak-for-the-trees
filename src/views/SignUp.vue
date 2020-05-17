<template>
  <div class="container">
    <img class="auth-logo" src="../assets/sftt-logo-text.jpg" />
    <h1>Sign Up</h1>
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

      <b-alert v-model="error" variant="danger" dismissible>
        {{ errorMessage }}
      </b-alert>

      <p>ALREADY HAVE AN ACCOUNT? <br>LOGIN <router-link to="/login">HERE!</router-link></p>

      <b-button type="submit">Sign Up</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
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
      error: false,
      errorMessage: '',
    };
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser',
    }),
    onSignUp(e) {
      e.preventDefault();
      this.submitted = true;
      if (this.password[0] === this.password[1]) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password[0],
          firstName: this.firstName,
          lastName: this.lastName,
        };
        signup(user).then(() => {
          this.setUser();
          this.$router.push('/');
        })
          .catch((error) => {
            this.error = true;
            this.errorMessage = `${error.response.data}`;
          });
      } else {
        this.error = true;
        this.errorMessage = 'Your passwords do not match';
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
}
.auth-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  margin-top: 10%;
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
