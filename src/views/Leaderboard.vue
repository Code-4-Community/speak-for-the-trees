<template>
  <div class="container">
    <h1>Leaderboard</h1>
    <div class="board">
      <!-- heading to select view -->
      <div class="heading">
        <button
        v-bind:class="[showPlayers ? 'active' : 'inactive']"
        @click="openPlayers">
        Players
        </button>
        <div class=divider></div>
        <button
        v-bind:class="[showPlayers ? 'inactive' : 'active']"
        @click="openProgress">
        My Progress
        </button>
      </div>
      <players v-if="showPlayers" />
      <my-progress v-if="!showPlayers" />
    </div>
  </div>
</template>

<script>
import players from '../components/Leaderboard/Players.vue';
import myProgress from '../components/Leaderboard/My progress.vue';

export default {
  name: 'leaderboard',
  components: {
    players,
    myProgress,
  },
  data() {
    return {
      showPlayers: Boolean,
    };
  },
  methods: {
    // show the leaderboard
    openPlayers() {
      this.showPlayers = true;
    },
    // show the teams progress
    openProgress() {
      this.showPlayers = false;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding-top: 5vh;
  width: 98vw;
}

.board {
  position: relative;
  width: 90vw;
  height: 80vh;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 3vw;
  background: #D4EDAA;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.heading {
  position: absolute;
  width: 90vw;
  height: 7vh;
  background: #9AC356;
  border-radius: 15px;
  text-align: center;
}

.heading button {
  position: relative;
  top: 30%;
  background: #9AC356;
  box-sizing: border-box;
  padding: 0 1em;
  font-size: 100%;
  font-weight: bold;
  color: #FFFFFF;
}

.heading button.active {
  border: 2px solid #D4EDAA;
  border-radius: 100px;
}

.heading button.inactive {
  border: none;
}

.divider {
    width: 20%;
    height: auto;
    display: inline-block;
}
</style>
