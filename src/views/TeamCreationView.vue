<template>
  <div class="container">
    <h1>Create a team</h1>

    <b-form @submit="onSubmit">
      <b-form-group>
        <b-form-input
          v-model="form.teamName"
          type="text"
          required
          placeholder="TEAM NAME"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-textarea
          v-model="form.teamBio"
          type="text"
          required
          placeholder="TEAM BIO"
        ></b-form-textarea>
      </b-form-group>

      <div class="mobile">
        <b-form-group class="goal">
          <b-form-input
            v-model="form.teamGoal"
            type="number"
            required
            placeholder="TEAM GOAL #"
          ></b-form-input>
        </b-form-group>

        <p class="text">BLOCKS BY</p>

        <b-form-group>
          <b-form-datepicker v-model="form.teamDate" :min="dateToday"></b-form-datepicker>
        </b-form-group>
      </div>

      <b-form-group class="desktop">
        <div class="form-row">
          <div class="col">
            <b-form-input
            v-model="form.teamGoal"
            type="number"
            required
            placeholder="TEAM GOAL #"
            ></b-form-input>
          </div>
          <p>BLOCKS BY</p>
          <div class="col">
            <b-form-input
            v-model="form.teamDate"
            type="date"
            required
            ></b-form-input>
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

    <b-alert v-model="alert" variant="success" dismissible>
      {{ this.form.alert }}
    </b-alert>
  </div>
</template>

<script>
import moment from 'moment';
import { createTeam } from '../api/api';

export default {
  name: 'TeamCreation',
  data() {
    return {
      members: 0,
      alert: null,
      form: {
        teamName: '',
        teamBio: '',
        teamGoal: Number,
        teamDate: Date,
      },
      invites: {
        memberNames: [],
        memberEmails: [],
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
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
        this.alert = error.message;
      });
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
    // ensures the team name is longer than 3 characters
    teamNameValidator() {
      return this.form.teamName.length > 3;
    },
    dateToday() {
      return new Date();
    },
  },
};
</script>

<style scoped lang="less">
fieldset.form-group {
  margin-bottom: 1.5rem;
}

input.form-control, textarea.form-control {
  border: 2px solid #C4C4C4;
  border-radius: 5px;
  float: left;
}

input.form-control::placeholder, textarea.form-control::placeholder {
  color: #E5E5E5;
}

.shortInput.form-control {
  width: 60%;
  margin: 0;
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

.alert.alert-success {
  background: #D4EDAA;
  border-radius: 15px;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
}
</style>
