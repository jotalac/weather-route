<script setup lang="ts">
import type { WeatherPoint } from '@/types';
import { formatTime } from '@/utils/util';
import { getWeatherDescription, getWeatherIconEmoji, getWeatherIcon } from '@/utils/weatherCodes';

const props = defineProps<{
  title: string;
  locationName: string;
  pointData: WeatherPoint;
  travelTimeSeconds: number;
}>();

const formatTimeArrival = (seconds: number) => {
  if (seconds === 0) return 'At departure';
  const timeString = formatTime(seconds)
  return `Arrival in ${timeString}`;
};
</script>

<template>
  <div class="big-card">

    <div class="card-header">
      <h3 class="title">{{ title }}</h3>
      <span class="time">{{ formatTimeArrival(travelTimeSeconds) }}</span>
    </div>

    <div class="tooltip">
      <h4 class="location-name">{{ locationName }}</h4>
      <span class="tooltiptext">{{ pointData.locationName }}</span>
    </div>

    <div class="weather-main">
      <!-- <span class="icon">{{ getWeatherIconEmoji(pointData.weather.weatherCode) }}</span> -->
      <component :is="getWeatherIcon(pointData.weather.weatherCode)" class="icon"/>
      <span class="temperature">{{ Math.round(pointData.weather.temerature) }}°C</span>
    </div>


    <div class="weather-desc">
      {{ getWeatherDescription(pointData.weather.weatherCode) }}
    </div>

    <div class="weather-details">
      <div class="detail-item">
        <span class="label">Wind</span>
        <span class="value">{{ pointData.weather.windSpeed }} km/h</span>
      </div>
      <div class="detail-item">
        <span class="label">Rain</span>
        <span class="value">{{ pointData.weather.rain }} mm</span>
      </div>

      <div class="detail-item">
        <span class="label">Humidity</span>
        <span class="value">{{ pointData.weather.relativeHumidity }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.big-card {
  background-color: transparent;
  background-color: rgba(9, 15, 30, 0.039);
  backdrop-filter: blur(10px);
  border: 1px solid var(--primary-250);
  border-radius: var(--border-rad-big);
  padding: 20px;
  flex: 1;
  min-width: 280px;
  color: var(--primary-100);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.1s ease-in-out;
}

.big-card:hover {
  filter: brightness(1.1);
}

.card-header {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  /* border-bottom: 1px solid var(--primary-750); */
  padding-bottom: 10px;
}

.title {
  color: var(--gray-250);
  font-size: var(--header-text);
  margin: 0;
}

.time {
  font-size: var(--small-text);
  background-color: var(--primary-500);
  color: var(--gray-250);
  padding: 4px 8px;
  border-radius: var(--border-rad-smaller);
}

.location-name {
  color: var(--primary-0);
  font-size: 3em;
  margin: 0;
  text-align: center;
  cursor: default;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Ensure words break properly if it's one giant unbroken string */
  word-break: break-word;

}

.weather-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 15px; */
  margin: 10px 0;
  margin-top: auto;
}

.icon {
  width: 200px;
  height: 200px;
  line-height: 1;
  font-size: 10em;
}

.temperature {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-0);
}

.weather-desc {
  font-size: 1.5em;
  font-style: italic;
  color: var(--gray-250);
  text-align: center;
}

.weather-details {
  display: flex;
  justify-content: space-between;
  background-color: rgba(8, 28, 43, 0.398);
  border-radius: var(--border-rad-main);
  padding: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.label {
  font-size: 0.8rem;
  color: var(--gray-500);
  text-transform: uppercase;
}

.value {
  font-weight: bold;
  color: var(--primary-100);
}

@media (max-width: 800px) {
  .location-name, .temperature {
    font-size: 2em;
  }

  .weather-desc {
    font-size: 1.5em;
  }

  .value {
    font-weight: normal;
  }

  .icon {
    width: 100px;
    height: 100px;
  }
}
</style>
