<template>
  <div>
      <h1>
        {{ name }}
        <img v-if="permissionLevel == 2" src="../../assets/edit-icon.svg" alt="edit">
      </h1>
      <p class="basicText">{{ bio }}</p>
      <p class="banner">
        TEAM GOAL  <img v-if="permissionLevel == 2" src="../../assets/edit-icon.svg" alt="edit">
      </p>
      <p class="basicText">Click on the trophy to view the team leaderboard</p>
      <div class="goal">
          <p>{{ goal }} BLOCKS</p>
          <p>BY</p>
          <p>{{ formattedTargetDate }}</p>
      </div>
      <div class="progressWrapper">
        <div class="progress">
          <div class="progress-bar"
          role="progressbar">
          {{ progressPercent }}%</div>
        </div>
        <a href="">
          <img src="../../assets/trophy.svg" alt="trophy">
        </a>
      </div>
      <p class="trophyProgress">{{ blocksCompleted }}/{{ goal }}</p>
      <p class="members">MEMBERS</p>
      <div v-if="permissionLevel == 1 || permissionLevel == 2">
        <div
        v-for="member in members"
        :key="member">
          <p v-if="member.teamRole >= 2" class="member">{{ member.username }} (Owner)</p>
          <p v-else class="member">{{ member.username }}</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TeamView',
  data() {
    return {
      id: 100,
      name: 'My Awesome Team',
      bio: 'Amazing team, count so many trees, all day long, preference for Sundays.',
      goal: 20,
      goalCompleteDate: new Date('2020-03-25'),
      blocksCompleted: 12,
      blocksReserved: 18,
      members: [{
        id: 1,
        username: 'member 1',
        blocksCompleted: 0,
        blocksReserved: 5,
        teamRole: 1,
      },
      {
        id: 2,
        username: 'member 2',
        blocksCompleted: 3,
        blocksReserved: 5,
        teamRole: 2,
      },
      {
        id: 3,
        username: 'member 3',
        blocksCompleted: 4,
        blocksReserved: 5,
        teamRole: 1,
      },
      {
        id: 4,
        username: 'member 4',
        blocksCompleted: 5,
        blocksReserved: 5,
        teamRole: 1,
      }],
      prospect: 0,
      member: 1,
      owner: 2,
      permissionLevel: 1,
    };
  },
  computed: {
    // format the target date into the appropriate format
    formattedTargetDate() {
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const [{ value: mo },,
        { value: da },,
        { value: ye }] = dtf.formatToParts(this.goalCompleteDate);
      return `${mo}/${da}/${ye}`;
    },
    progressPercent() {
      return this.blocksCompleted / this.goal * 100;
    },
  },
};
</script>

<style scoped>
.edit {
  border: none;
  background: none;
}
.progressWrapper {
  display: flex;
}
.progressWrapper a {
  margin: 0 auto 1.5rem 0;
}
.trophyProgress {
  text-align: right;
  margin: auto 2rem 1rem auto;
}
.banner {
  background: #9AC356;
  font-size: 14px;
  padding: 0.5rem 0;
}
.banner img {
  margin: 0;
  height: 100%;
}
.progress {
  margin: 0.5rem auto 2rem 10vw;
  width: 70vw;
}
.progress-bar {
  background-color: #9AC356;
  width: 60%;
}
.basicText {
  color: #C4C4C4;
  padding: 0 2rem;
}
.goal {
  display: flex;
  justify-content: space-around;
  padding: 0 3rem;
}
.members {
  background: #9AC356;
  font-size: 14px;
  padding: 0.5rem 0;
  margin-bottom: 0;
}
.member {
  text-align: left;
  background: #D4EDAA;
  margin: 0;
  padding: 0.5rem 0 0.5rem 1.5rem;
  border-bottom: 1px solid white;
}
</style>
