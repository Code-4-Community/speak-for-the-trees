<template>
  <div class="title-container">
    <return-button />
    <h3>{{title}}</h3>
    <p>{{subtitle}}</p>
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
    },
    subtitle: {
      required: false,
    },
  },
};
</script>

<style scoped lang="less">

  p {
    color: #C4C4C4;
    margin: 0;
  }

  .title-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem 0 1rem 0;
  }

  .title-container > h3 {
    width: 100%;
    margin: 0;
  }

  .title-container > button {
    position: absolute;
    left: -2rem;
  }
</style>
