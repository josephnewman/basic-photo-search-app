<template>
  <div class="photo-card">
    <a :href="image.pageURL" class="photo-card__anchor" target="_blank">
      <img
        :src="image.webformatURL"
        :alt="image.user"
        class="photo-card__img"
      />
      <div class="photo-card__author">{{ image.user }}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'PhotoCard',
  props: {
    image: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-card {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.5);

  &__author {
    position: absolute;
    text-align: center;
    z-index: 1;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    color: white;
  }

  &:hover {
    -webkit-box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 1);
  }
}
</style>
