<script setup lang="ts">
import MainSearchForm from '@/components/home/MainSearchForm.vue';
import WeatherIcon from '@/components/icons/WeatherIcon.vue';


</script>

<template>
  <main id="main-container">
    <h1 id="main-title">
      Find
      <span class="highlighted-word">
        <WeatherIcon class="title-icon"/>
        weather
      </span>
      on your journey
    </h1>
    <MainSearchForm/>



  </main>

</template>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

#main-title {
  font-size: var(--main-title-text);
  color: var(--primary-0);
  font-weight: 400;
  margin-bottom: 50px;
  text-align: center;
  max-width: 90%;
}

.title-icon {
  width: 80px;
  height: 80px;
}

@media (max-width:750px) {
  #main-title{
    font-size: 3em;
    line-height: 1.2;
  }

  .title-icon{
    width: 40px;
    height: 40px;
  }

}

</style>
