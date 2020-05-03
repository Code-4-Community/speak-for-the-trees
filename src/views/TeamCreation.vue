<template>
  <div class="container">
    <h1>Create a team</h1>

    <b-form @submit="onSubmit">
      <b-form-group>
        <b-form-input
          v-model="form.teamName"
          type="text"
          :state="teamNameValidator"
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

      <b-form-group class="goal">
        <b-form-input
          class="shortInput"
          v-model="form.teamGoal"
          type="number"
          required
          placeholder="TEAM GOAL #"
        ></b-form-input>
        <p>BLOCKS</p>
      </b-form-group>

      <p class="text">BY</p>

      <b-form-group>
        <b-form-input
          class="shortInput"
          v-model="form.teamDate"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-for="x in members" :key="x"
          class="member"
          v-model="form.memberEmails[x - 1]"
          type="email"
          placeholder="MEMBER EMAIL"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-button class="add" v-on:click="members += 1">+ MEMBER</b-button>
      </b-form-group>

      <b-button class="create" type="submit">Create!</b-button>
    </b-form>

    <b-alert v-model="showAlert" variant="success" dismissible>
      You have succesfully created {{ this.form.teamName }}!
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'TeamCreation',
  data() {
    return {
      members: 1,
      showAlert: false,
      form: {
        teamName: '',
        teamBio: '',
        teamGoal: Number,
        teamDate: Date,
        memberEmails: [],
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(JSON.stringify({
        name: this.form.teamName,
        bio: this.form.teamBio,
        goal: Number(this.form.teamGoal),
        goalCompletionDate: this.form.teamDate,
        inviteEmails: this.form.memberEmails,
      }));
      this.showAlert = true;
    },
  },
  computed: {
    teamNameValidator() {
      return this.form.teamName.length > 3;
    },
  },
};
</script>

<style>
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

p {
  text-align: left;
  /* CREATE SPACE BETWEEN BOX AND 'BLOCKS' */
}

/* STYLE 'BY' */
.text {
  margin: 0 0 0 1rem;
  text-align: left;
}

fieldset.goal.form-group {
  margin-bottom: 0;
}

.member.form-control {
  margin-bottom: 1rem;
}

.member.form-control:last-child {
  margin-bottom: 0rem;
}

button.add, button.add:hover, button.add:focus {
  float: left;
  border: none;
  background: none;
  color: black;
}

button.create, button.create:hover, button.create:focus {
  background: #9AC356;
  padding: 0.5rem 2rem 0.5rem 2rem;/* top right bottom left*/
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
