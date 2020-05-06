<template>
  <div>
      <h1>{{ name }}</h1>
      <p class="basicText">{{ bio }}</p>
      <p class="banner">TEAM GOAL</p>
      <p class="basicText">Click on trophy to view team leaderboard</p>
      <div class="goal">
          <p>{{ goal }} BLOCKS</p>
          <p>BY</p>
          <p>{{ targetDate }}</p>
      </div>
      <div class="test">
        <div class="progress">
          <div class="progress-bar"
          role="progressbar">
          {{ progressBar }}%</div>
        </div>
        <img src="" alt="trophy">
      </div>
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
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
      members: ['MEMBER 1', 'MEMBER 2', 'MEMBER 3', 'MEMBER 4'],
      goal: 20,
      target: new Date('2020-03-25'),
      permission: 1, // 0 prospect, 1 member, 2 owner
      progress: 12,
    };
  },
  computed: {
    // format the target date into the appropriate format
    targetDate() {
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const [{ value: mo },, { value: da },, { value: ye }] = dtf.formatToParts(this.target);
      return `${mo}/${da}/${ye}`;
    },
    progressBar() {
      return this.progress / this.goal * 100;
    },
  },
};
</script>

<style scoped>
.test {
  display: flex;
}
.test img {
  margin: 0 1rem;
}
.banner {
    background: #9AC356;
    font-size: 14px;
    padding: 0.5rem 0;
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
