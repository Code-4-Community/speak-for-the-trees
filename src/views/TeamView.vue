<template>
  <div>
      <h1>{{ name }}  <img v-if="permission >= 2" src="../../assets/edit-icon.svg" alt="edit"></h1>
      <p class="basicText">{{ bio }}</p>
      <p class="banner">
        TEAM GOAL  <img v-if="permission >= 2" src="../../assets/edit-icon.svg" alt="edit">
      </p>
      <p class="basicText">Click on the trophy to view the team leaderboard</p>
      <div class="goal">
          <p>{{ goal }} BLOCKS</p>
          <p>BY</p>
          <p>{{ targetDate }}</p>
      </div>
      <div class="test">
        <div class="progress">
          <div class="progress-bar"
          role="progressbar">
          {{ progressPercent }}%</div>
        </div>
        <a href="">
          <img src="../../assets/trophy.svg" alt="trophy">
        </a>
      </div>
      <p class="trophyProgress">{{ progress }}/{{ goal }}</p>
      <p class="members">MEMBERS</p>
      <div v-if="permission >= 1">
        <p
        v-for="member in members"
        :key="member"
        class="member">{{ member }}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TeamView',
  data() {
    return {
      name: 'My Awesome Team',
      bio: 'Amazing team, count so many trees, all day long, preference for Sundays.',
      members: ['MEMBER 1', 'MEMBER 2', 'MEMBER 3', 'MEMBER 4'],
      progress: 12,
      goal: 20,
      target: new Date('2020-03-25'),
      permission: 1, // 0 prospect, 1 member, 2 owner
    };
  },
  computed: {
    // format the target date into the appropriate format
    targetDate() {
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const [{ value: mo },, { value: da },, { value: ye }] = dtf.formatToParts(this.target);
      return `${mo}/${da}/${ye}`;
    },
    progressPercent() {
      return this.progress / this.goal * 100;
    },
  },
};
</script>

<style scoped>
.edit {
  border: none;
  background: none;
}
.test {
  display: flex;
}
.test a {
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
.members {
  background: #9AC356;
  font-size: 14px;
  padding: 0.5rem 0;
  margin-bottom: 0;
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
.member {
    text-align: left;
    background: #D4EDAA;
    margin: 0;
    padding: 0.5rem 0 0.5rem 1.5rem;
    border-bottom: 1px solid white;
}
</style>
