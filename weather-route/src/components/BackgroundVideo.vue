<script setup lang="ts">
import { getWeatherVideo } from '@/utils/weatherCodes';
import { ref } from 'vue';

const props = defineProps<{
  weatherCode: number
}>()

const isVisible = ref(true);

const onVideoEnd = () => {
  isVisible.value = false;
};

const videoLink = new URL(`../assets/video/${getWeatherVideo(props.weatherCode)}`, import.meta.url).href;

</script>

<template>

  <video
    autoplay
    muted
    playsinline
    class="background-video"
    :class="{ 'fade-out': !isVisible }"
    @ended="onVideoEnd"
  >
    <source :src="videoLink" type="video/webm">
  </video>

</template>

<style scoped>
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  opacity: 0.8;
  pointer-events: none;
  transition: opacity 2s ease-out;
  background: black !important;
  /* make the bottom transparent */
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 90%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%);
}

.background-video.fade-out {
  opacity: 0;
}
</style>
