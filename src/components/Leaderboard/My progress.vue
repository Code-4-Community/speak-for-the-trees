<template>
    <div class="progress" v-if="!showPlayers">
        <h2>Team 3</h2>
        <img alt="Icon">
        <p class="ranking">3rd place</p>
        <p class="points">20</p>
        <div class="members">
          <p>Member 1</p>
          <p>Member 2</p>
          <p>Member 3</p>
          <p>Member 4</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MyProgress',
};
</script>

<style scoped lang="less">
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
  font-style: italic;
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
