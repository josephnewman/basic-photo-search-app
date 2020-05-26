<template>
  <div class="photos">
    <div class="photos__search">
      <TextInput v-model="query" @text-input="onQueryChange" type="input" class="photos__input" />
    </div>
    <PhotoCard v-for="photo in photos" :key="photo.id" :image="photo" class="photos__card" />
    <div v-if="loading" class="photos__loading">
      <img class="photos__spinner" src="../../assets/pulse.svg" />
    </div>
  </div>
</template>

<script>
import PhotosApi from '@/services/PhotosApi';
import { PhotoCard, TextInput } from '../../components';
import config from '../../constants/config';
import debounce from 'lodash.debounce';

export default {
  name: 'Photos',
  components: {
    PhotoCard,
    TextInput
  },
  data() {
    return {
      photos: [],
      page: 0,
      query: config.DEFAULT_SEARCH_TERM,
      loading: false
    };
  },
  async mounted() {
    await this.getPhotos();
    this.scroll();
  },
  methods: {
    async getPhotos() {
      this.loading = true;
      this.page = this.page + 1;
      try {
        let newPhotos = await PhotosApi.getRandomPhotos(this.query, this.page);

        if (newPhotos) {
          this.photos = [...new Set([...this.photos, ...newPhotos])];
        }
      } catch (e) {
        /*in the real world we would do something here */
      } finally {
        this.loading = false;
      }
    },
    onQueryChange: debounce(function() {
      this.page = 0;
      this.photos = [];
      this.getPhotos();
    }, 500),
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(window.pageYOffset, window.document.documentElement.scrollTop, window.document.body.scrollTop) +
            window.innerHeight +
            150 >=
          window.document.documentElement.offsetHeight;

        if (bottomOfWindow && this.loading === false) {
          this.loading = true;
          setTimeout(this.getPhotos, config.PHOTO_DELAY_TIME);
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.photos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  &__card {
    margin: 25px;
  }

  &__loading,
  &__search {
    width: 100%;
  }

  &__spinner {
    width: 100px;
  }
}
</style>
