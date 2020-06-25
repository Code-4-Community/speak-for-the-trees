<template>
  <div class="spanner">
    <div class="title-container">
      <return-button :path="this.path" />
      <h3>{{title}}</h3>
      <p>{{subtitle}}</p>
    </div>
  </div>
</template>

<script>
import ReturnButton from './ReturnButton.vue';

export default {
  name: 'PageTitle',
  components: {
    ReturnButton,
  },
  props: {
    title: {
      required: true,
      type: String,
    },
    subtitle: {
      required: false,
      type: String,
    },
    path: {
      required: false,
      type: Object,
    },
  },
};
</script>

<style scoped lang="less">

  .spanner {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-container {
    width: 30rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem 0 1rem 0;
    margin: 0 3rem 0 3rem;
  }

  .title-container > h3 {
    font-weight: bold;
    width: 100%;
    margin: 0;
  }

  .title-container > button {
    position: absolute;
    left: -2rem;
  }

  p {
    color: #C4C4C4;
    margin: 0;
  }
</style>
