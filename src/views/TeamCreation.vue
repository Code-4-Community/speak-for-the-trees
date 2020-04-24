<template>
   <div>
     <h3>Create Your Team</h3>
      <b-form>
      <b-form-group>
        <b-form-input
          id="input-username"
          v-model="teamName"
          type="text"
          required
          placeholder="Enter your team name"
        ></b-form-input>
        </b-form-group>

      <b-form-group>
        <b-form-input
          v-for="x in members" :key="x"
          class="input-member"
          v-model="memberEmails[x]"
          type="email"
          placeholder="Enter Member's Email"
        ></b-form-input>
        </b-form-group>
     <b-form-group>
    <b-button v-on:click="members += 1" variant="outline-success">(+) Add Another Member</b-button>
    </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    </div>
</template>

<script>
export default {
  name: 'TeamCreation',
  members: 1,
  data: () => ({
    members: 1,
    memberEmails: [],
    teamName: '',
  }),
  computed: {

  },
};
</script>

<style>
.team-creation {

}
</style>
