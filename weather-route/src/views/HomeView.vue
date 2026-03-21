<script setup lang="ts">
import MainSearchForm from '@/components/home/MainSearchForm.vue';
import SearchHistoryItem from '@/components/home/SearchHistoryItem.vue';
import HistoryIcon from '@/components/icons/HistoryIcon.vue';
import WeatherIcon from '@/components/icons/WeatherIcon.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const formSubmit = () => {
  router.push("weather")
}

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
    <MainSearchForm v-on:form-submitted="formSubmit"/>

    <div class="search-history-cont">
        <div class="search-history-title">
          <h2>
            <HistoryIcon class="header-icon"/>
            Search history
          </h2>

          <RouterLink to="/history" class="full-history-link">View full histroy</RouterLink>
        </div>


      <div class="history-items-cont">
        <!-- sample - needs to get data from local storage and display it as this history, limit it to like 10 items -->
        <SearchHistoryItem start-location="Prague" destination="Brno" transport-mode="bike" search-date-time="2026-03-11T02:54"/>
        <SearchHistoryItem start-location="Prague" destination="Brno" transport-mode="car" search-date-time="2026-01-11T02:54"/>
        <SearchHistoryItem start-location="Prague" destination="Brno" transport-mode="foot" search-date-time="2026-02-11T02:54"/>
        <SearchHistoryItem start-location="Prague" destination="Brno" transport-mode="bike" search-date-time="2026-10-11T02:54"/>
        <SearchHistoryItem start-location="Prague" destination="Brno" transport-mode="car" search-date-time="2026-01-11T02:54"/>
        <SearchHistoryItem start-location="Prague" destination="Brno" transport-mode="bike" search-date-time="2026-05-11T02:54"/>
        <SearchHistoryItem start-location="Prague" destination="Brno" transport-mode="foot" search-date-time="2023-01-11T02:54"/>
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
  max-width: 100vw;
  overflow-x: scroll;
  color: var(--primary-100);
  margin-top: 50px;
  padding: 0 20px;
}

.history-items-cont{
  display: flex;
  width: 100%;
  overflow-x: scroll;
  gap: 20px;
  padding-bottom: 20px;
}

.search-history-cont h2 {
  display: flex;
  align-items: center;
  justify-content: start;
}

.header-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.search-history-title{
  max-width: 90%;
  margin-bottom: 20px;
}

.full-history-link{
  text-decoration: underline;
  color: var(--primary-250);
}

.full-history-link:hover {
  filter: brightness(1.2);
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
