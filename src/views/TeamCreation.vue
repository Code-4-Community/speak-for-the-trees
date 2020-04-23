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
          v-model="membersEmails"
          type="email"
          placeholder="Enter Member's Email"
        ></b-form-input>
        </b-form-group>
<b-form-group>
<b-button v-on:click="members += 1" variant="outline-success">(+) Add Another Member</b-button>
</b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <!-- <div class="team-creation">
     <b-form-input v-model="text" placeholder="Enter your Team Name"></b-form-input>
     <b-form-input v-for="x in members" :key="x"
     placeholder="Enter your Member"></b-form-input>
    </div>
     <b-col v-on:click="members += 1" lg="4" class="pb-2">
         <b-button variant="outline-primary">Add Another Member</b-button>
         </b-col>
         <b-button variant="success">Create Team</b-button> -->
    </div>
</template>

<script>
export default {
  name: 'TeamCreation',
  members: 1,
  data: () => ({
    members: 1,
  }),
  computed: {

  },
};
</script>

<style>
.team-creation {

}
</style>
