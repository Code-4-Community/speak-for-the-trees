<template>
  <div class="container">
    <page-title :title="'Create a Team'" />
    <b-form @submit="onSubmit" novalidate>
      <b-form-group>
        <b-form-input
          v-model="form.teamName"
          type="text"
          required
          :state="validateName"
          placeholder="TEAM NAME"
        ></b-form-input>
        <b-form-invalid-feedback>
          Your team name must be at least 4 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-form-textarea
          v-model="form.teamBio"
          type="text"
          required
          :state="validateBio"
          placeholder="TEAM BIO"
        ></b-form-textarea>
        <b-form-invalid-feedback>
          Your team bio cannot be empty
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="mobile">
        <b-form-group class="goal">
          <b-form-input
            v-model="form.teamGoal"
            type="number"
            required
            :state="validateGoal"
            placeholder="TEAM GOAL #"
          ></b-form-input>
          <b-form-invalid-feedback>
            The goal must be greater than 0
          </b-form-invalid-feedback>
        </b-form-group>

        <p class="text">BLOCKS BY</p>

        <b-form-group>
          <b-form-datepicker
            v-model="form.teamDate"
            :min="dateToday"
            :state="validateDate"
          ></b-form-datepicker>
          <b-form-invalid-feedback>
            The date cannot be empty
          </b-form-invalid-feedback>
        </b-form-group>
      </div>

      <b-form-group class="desktop">
        <div class="form-row">
          <div class="col">
            <b-form-input
            v-model="form.teamGoal"
            type="number"
            required
            :state="validateGoal"
            placeholder="TEAM GOAL #"
            ></b-form-input>
            <b-form-invalid-feedback>
              The goal must be greater than 0
            </b-form-invalid-feedback>
          </div>
          <p>BLOCKS BY</p>
          <div class="col">
            <b-form-datepicker
            v-model="form.teamDate"
            :min="dateToday"
            :state="validateDate"
          ></b-form-datepicker>
          <b-form-invalid-feedback>
            The date cannot be empty
          </b-form-invalid-feedback>
          </div>
        </div>
      </b-form-group>

      <b-form-group v-if="members > 0">
        <div
        class="form-row"
        v-for="x in members" :key="x">
          <div class="col">
            <b-form-input
            v-model="invites.memberNames[x - 1]"
            type="text"
            placeholder="NAME"
            ></b-form-input>
          </div>
          <div class="col">
            <b-form-input
            v-model="invites.memberEmails[x - 1]"
            type="email"
            placeholder="MEMBER EMAIL"
            ></b-form-input>
          </div>
        </div>
      </b-form-group>

      <b-form-group>
        <b-button class="add" v-on:click="members += 1">+ MEMBER</b-button>
        <b-button class="remove" v-if="members > 0" v-on:click="members -= 1">- MEMBER</b-button>
      </b-form-group>

      <b-button class="create" type="submit">Create!</b-button>
    </b-form>
  </div>
</template>

<script>
import moment from 'moment';
import { createTeam } from '../api/api';
import PageTitle from '../components/PageTitle.vue';

export default {
  name: 'TeamCreation',
  components: {
    PageTitle,
  },
  data() {
    return {
      members: 0,
      form: {
        teamName: '',
        teamBio: '',
        teamGoal: '',
        teamDate: '',
      },
      invites: {
        memberNames: [],
        memberEmails: [],
      },
      submitted: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.submitted = true;
      if (this.validate()) {
        createTeam({
          name: this.form.teamName,
          bio: this.form.teamBio,
          goal: Number(this.form.teamGoal),
          goalCompletionDate: moment(this.form.teamDate).format('YYYY-MM-DDTHH:mm'),
          invites: this.getInvites(),
        }).then((response) => {
          this.$store.dispatch('getAllTeams');
          this.$router.push(`/team/${response.data.id}`);
        }).catch((error) => {
          this.$bvToast.toast(`${error.message}`);
        });
      }
    },
    validate() {
      return this.validateName && this.validateBio && this.validateGoal && this.validateDate;
    },
    // creates an object holding the names and email addresses of the invitees
    getInvites() {
      const result = [];
      let i = 0;
      while (i < this.invites.memberNames.length) {
        const invite = { name: this.invites.memberNames[i], email: this.invites.memberEmails[i] };
        result[i] = invite;
        i += 1;
      }
      return result;
    },
  },
  computed: {
    dateToday() {
      return new Date();
    },
    validateName() {
      if (!this.submitted) {
        return null;
      }
      return this.form.teamName.length >= 4;
    },
    validateBio() {
      if (!this.submitted) {
        return null;
      }
      return this.form.teamBio.length > 0;
    },
    validateGoal() {
      if (!this.submitted) {
        return null;
      }
      return Number(this.form.teamGoal) > 0;
    },
    validateDate() {
      if (!this.submitted) {
        return null;
      }
      return this.form.teamDate !== '';
    },
  },
};
</script>

<style scoped lang="less">
fieldset.form-group {
  margin-bottom: 1.5rem;
}

input.form-control, textarea.form-control, .dropdown {
  border: 2px solid #C4C4C4;
  border-radius: 5px;
  float: left;
}

input.form-control::placeholder, textarea.form-control::placeholder, .dropdown::placeholder {
  color: #E5E5E5;
}

/* STYLE 'BY' */
.text {
  margin: 0.2rem;
  text-align: center;
}

@media only screen and (min-width: 768px) {
  .mobile {
    display: none;
  }
}

fieldset.goal.form-group {
  margin-bottom: 0;
}

.form-row {
  margin-bottom: 0.5rem;
}

@media only screen and (max-width: 768px) {
  .desktop.form-group {
    display: none;
  }
}

.desktop.form-group {
  p {
    margin: 0.4rem;
  }
}

.form-row:last-child {
  margin-bottom: 0rem;
}

button.add, button.add:hover, button.add:focus,
button.remove, button.remove:hover, button.remove:focus {
  margin-top: 0;
  float: left;
  border: none;
  background: none;
  color: black;
}

button.create, button.create:hover, button.create:focus {
  background: #9AC356;
  padding: 0.5rem 2rem 0.5rem 2rem;
  border-radius: 5px;
  border: none;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  float: right;
}

.invalid-feedback {
  text-align: left;
  margin-left: 5px;
}
</style>
