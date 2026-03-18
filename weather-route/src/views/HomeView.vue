<script setup lang="ts">
import MainSearchForm from '@/components/home/MainSearchForm.vue';
import SearchHistoryItem from '@/components/home/SearchHistoryItem.vue';
import HistoryIcon from '@/components/icons/HistoryIcon.vue';
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

    <div class="search-history-cont">
      <h2>
        <HistoryIcon class="header-icon"/>
        Search history
      </h2>

      <div class="history-items-cont">
        <SearchHistoryItem/>
        <SearchHistoryItem/>
        <SearchHistoryItem/>
        <SearchHistoryItem/>
        <SearchHistoryItem/>
      </div>
    </div>


  </main>

</template>

<style scoped>
#main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px 50px 30px;
  max-width: 1500px;
}

#main-title {
  font-size: var(--main-title-text);
  color: var(--primary-0);
  font-weight: 400;
  margin-bottom: 50px;
  text-align: center;
  max-width: 90%;
  margin-top: 50px;
}

.title-icon {
  width: 80px;
  height: 80px;
}

.search-history-cont {
  width: 100%;
  overflow-x: scroll;
  color: var(--primary-100);
  margin-top: 50px;
}

.history-items-cont{
  display: flex;
  width: 100%;
  overflow-x: scroll;
  gap: 20px;
}

.search-history-cont h2 {
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 15px;
}

.header-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
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
