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
        <div
        class="form-row"
        v-for="x in members" :key="x">
          <div class="col">
            <b-form-input
            v-model="invites.memberNames[x - 1]"
            type="text"
            required
            placeholder="NAME"
            ></b-form-input>
          </div>
          <div class="col">
            <b-form-input
            v-model="invites.memberEmails[x - 1]"
            type="email"
            required
            placeholder="MEMBER EMAIL"
            ></b-form-input>
          </div>
        </div>
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
      console.log(JSON.stringify({
        name: this.form.teamName,
        bio: this.form.teamBio,
        goal: Number(this.form.teamGoal),
        goalCompletionDate: this.form.teamDate,
        inviteEmails: this.invites.memberEmails,
      }));
      console.log(JSON.stringify(this.getInvites()));
      this.showAlert = true;
    },
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
    teamNameValidator() {
      return this.form.teamName.length > 3;
    },
  },
};
</script>

<style scoped>
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
  text-indent: 1em;
}

/* STYLE 'BY' */
.text {
  margin: 0;
  text-align: left;
}

fieldset.goal.form-group {
  margin-bottom: 0;
}

.form-row {
  margin-bottom: 0.5rem;
}

.form-row:last-child {
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
