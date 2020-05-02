<template>
  <div class="container">
    <h1>Create a team</h1>

    <b-form>
      <b-form-group>
        <b-form-input
          v-model="teamName"
          type="text"
          :state="teamNameValidator"
          required
          placeholder="TEAM NAME"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="teamBio"
          type="text"
          required
          placeholder="TEAM BIO"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="goal">
        <b-form-input
          class="shortInput"
          v-model="teamGoal"
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
          v-model="teamDate"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-for="x in members" :key="x"
          class="member"
          v-model="memberEmails[x]"
          type="email"
          placeholder="MEMBER EMAIL"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-button class="add" v-on:click="members += 1">+ MEMBER</b-button>
      </b-form-group>

      <b-button class="create" type="submit">Create!</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'TeamCreation',
  owners: 1,
  members: 1,
  visibility: '',
  methods: {
  },
  data: () => ({
    members: 1,
    owners: 1,
    ownerEmails: [],
    memberEmails: [],
    teamName: '',
    teamBio: '',
    teamGoal: Number,
    teamDate: Date,
  }),
  computed: {
    teamNameValidator() {
      return this.teamName.length > 3;
    },
  },
};
</script>

<style>
fieldset.form-group {
  margin-bottom: 1.5rem;
}

input.form-control {
  border: 2px solid #C4C4C4;
  border-radius: 5px;
  float: left;
}

input.form-control::placeholder {
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
  padding: 0.5em;
  border-radius: 5px;
  border: none;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  float: right;
}
</style>
