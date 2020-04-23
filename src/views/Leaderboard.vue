<template>
  <div class="container">
    <h1>Leaderboard</h1>
    <div class="board">
      <!-- heading to select view -->
      <div class="heading">
        <button class="active" @click="openPlayers" v-if="showPlayers">Players</button>
        <button class="inactive" @click="openPlayers" v-if="!showPlayers">Players</button>
        <div class=divider></div>
        <button class="active" @click="openProgress" v-if="!showPlayers">My progress</button>
        <button class="inactive" @click="openProgress" v-if="showPlayers">My progress</button>
      </div>
      <!-- Players -->
      <div class="rows" v-if="showPlayers">
        <!-- replace with v-for once data is loaded in -->
        <div class="row">
          <p class="rank">1</p>
          <p>Team 1</p>
          <p class="points">25</p>
        </div>
        <div class="row">
          <p class="rank">2</p>
          <p>Team 2</p>
          <p class="points">22</p>
        </div>
        <div class="row">
          <p class="rank">3</p>
          <p>Team 3</p>
          <p class="points">20</p>
        </div>
        <div class="row">
          <p class="rank">4</p>
          <p>Team 4</p>
          <p class="points">14</p>
        </div>
        <div class="row">
          <p class="rank">5</p>
          <p>Team 5</p>
          <p class="points">10</p>
        </div>
      </div>
      <!-- My progress -->
      <div class="progress" v-if="!showPlayers">
        <h2>Team 3</h2>
        <img src="../assets/tree 2.png" alt="Icon">
        <p class="ranking">3rd place</p>
        <p class="points">20</p>
        <div class="members">
          <p>Member 1</p>
          <p>Member 2</p>
          <p>Member 3</p>
          <p>Member 4</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leaderboard',
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

.rows {
   padding-top: 7vh;
}

.row {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #9AC356;
  .rank {
    font-weight: bold;
  }
}

.points {
  font-style: italic;
}

.row:last-child {
  border: none;
}

.progress h2 {
  position: absolute;
  top: 14vh;
  left: 35vw;
}

.progress .ranking {
  position: absolute;
  top: 20vh;
  left: 35vw;
}

.progress .points {
  position: absolute;
  top: 15vh;
  left: 72vw;
}

.progress img {
  position: absolute;
  top: 15vh;
  left: 8vw;
}

.progress .members {
  position: absolute;
  top: 35vh;
  left: 8vw;
  p {
    margin: 0.5em 0;
  }
}
</style>
