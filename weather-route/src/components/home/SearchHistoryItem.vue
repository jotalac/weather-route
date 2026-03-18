<script setup lang="ts">
import CarIcon from '../icons/CarIcon.vue';
import FlagIcon from '../icons/FlagIcon.vue';
import LocationIcon from '../icons/LocationIcon.vue';

</script>

<template>
  <div class="search-history-item">
    <div class="start-destination-cont">

      <div class="location-icon-cont">
        <LocationIcon/>
        <p>Start location</p>
      </div>

      <div class="location-icon-cont">
        <FlagIcon/>
        <p>Destination</p>
      </div>

      <CarIcon/>
    </div>

    <p>2025-04-01_11:23</p>

  </div>
</template>


<style scoped>
.search-history-item {
  width: 300px;
  height: 150px;
  border-radius: var(--border-rad-main);
  background-color: rgba(1, 9, 23, 0.707);
  padding: 20px 15px;
  border: 1px var(--primary-250) solid;
}

.start-destination-cont {
  display: flex;
  flex-direction: column;
}

.location-icon-cont{
  display: flex;
  margin-bottom: 10px;
}

.location-icon-cont p {
  color: var(--primary-100);
}

.location-icon-cont svg {
  margin-right: 10px;
  color: var(--primary-250);
}

</style>
