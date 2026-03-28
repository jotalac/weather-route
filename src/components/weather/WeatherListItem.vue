<script setup lang="ts">
import type { RoutePoint, WeatherPoint } from '@/types';
import { formatTime } from '@/utils/util';
import { getWeatherDescription, getWeatherIcon, getWeatherIconEmoji } from '@/utils/weatherCodes';
import WaterDropIcon from '../icons/weather/WaterDropIcon.vue';
import WindIcon from '../icons/weather/WindIcon.vue';
import AltitudeIcon from '../icons/weather/AltitudeIcon.vue';
import MapIcon from '../icons/MapIcon.vue';
import ActionButton from '../ActionButton.vue';
import TemperatureFeelsLikeIcon from '../icons/weather/TemperatureFeelsLikeIcon.vue';
import DewPointIcon from '../icons/weather/DewPointIcon.vue';
import HumidityIcon from '../icons/weather/HumidityIcon.vue';
import VisibilityIcon from '../icons/weather/VisibilityIcon.vue';
import RainIcon from '../icons/weather/RainIcon.vue';
import SnowIcon from '../icons/weather/SnowIcon.vue';
import { tooltip } from 'leaflet';
import WidthIcon from '../icons/WidthIcon.vue';
import HeightIcon from '../icons/HeightIcon.vue';

const props = defineProps<{
  point: WeatherPoint;
  lat: number
  lon: number
  travelTimeSeconds: number;
  pointNumber: number
  expanded: boolean

}>();

const emit = defineEmits<{
  (e: 'toggleExpand'): void
  (e: 'showOnMap'): void
}>()

const formatTimeDelay = (seconds: number) => {
  return `+${formatTime(seconds)}`
};

const extendedInfo = {
  apparentTemperature: {
    string: `${props.point.weather.apparentTemperature} °C`,
    icon: TemperatureFeelsLikeIcon,
    tooltip: "Feels like"
  },
  dewPoint: {
    string: `${props.point.weather.dewPoint} °C`,
    icon: DewPointIcon,
    tooltip: "Dew point"
  },
  humidity: {
    string: `${props.point.weather.relativeHumidity} %`,
    icon: HumidityIcon,
    tooltip: "Humidity"
  },
  visibility: {
    string: `${props.point.weather.visibility / 1000} km`,
    icon: VisibilityIcon,
    tooltip: "Visibility"
  },
  elevation: {
    string: `${props.point.elevation} m`,
    icon: AltitudeIcon,
    tooltip: "Elevation"
  },
  rain: {
    string: `${props.point.weather.rain} mm`,
    icon: RainIcon,
    tooltip: "Rain"
  },
  snow: {
    string: `${props.point.weather.snowFall} cm`,
    icon: SnowIcon,
    tooltip: "Snow"
  }
}


</script>

<template>
  <div class="list-item-container" :class="{ 'is-expanded': expanded }" @click="emit('toggleExpand')">

    <!-- Original visible row -->
    <div class="main-row">
      <div class="index-time-cont">
        <span class="item-index">{{ (pointNumber + 1).toString().padStart(2, "0") }}.</span>
        <div class="time-col">
          <span class="time-badge">{{ formatTimeDelay(travelTimeSeconds) }}</span>
        </div>
      </div>

      <div class="weather-desc-col">
        <div class="weather-col">
          <component :is="getWeatherIcon(point.weather.weatherCode)" class="weather-icon"/>
          <span class="temp">{{ Math.round(point.weather.temerature) }}°C</span>
        </div>

        <div class="desc-col">
          <span class="desc">{{ getWeatherDescription(point.weather.weatherCode) }}</span>
          <span class="location" v-if="point.locationName">{{ point.locationName }}</span>
        </div>
      </div>

      <div class="details-col">
        <span class="detail"><WaterDropIcon/> {{ point.weather.precipitationProbability }}%</span>
        <span class="detail"><WindIcon/> {{ point.weather.windSpeed }} km/h</span>
      </div>
    </div>

    <!-- expanded content -->
    <div v-if="expanded" class="expanded-content" @click.stop>
      <div class="additional-info">

        <span v-for="(value, index) in extendedInfo" :key="index" class="expanded-item tooltip">
          <span class="tooltiptext">{{ value.tooltip }}</span>
          <component :is="value.icon"/>
          {{ value.string }}
        </span>
      </div>

      <div class="lat-lon-cont" >
        <p class="tooltip">
          <span class="tooltiptext">Latitude</span>
          <HeightIcon/>
          {{ lat.toFixed(5) }}°
        </p>

        <p class="tooltip">
          <span class="tooltiptext">Longitude</span>
          <WidthIcon/>
          {{ lon.toFixed(5) }}°
        </p>
      </div>

      <button class="show-map-btn" @click.stop="emit('showOnMap')">
        <MapIcon />
        View on map
      </button>


    </div>

  </div>
</template>

<style scoped>
.list-item-container {
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  background-color: var(--primary-1000);
  border: 1px solid var(--primary-500);
  border-radius: var(--border-rad-main);
  margin-bottom: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.list-item-container:hover {
  filter: brightness(1.2);
}

.item-index{
  color: var(--gray-500);
  margin-right: 10px;
}

.main-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.expanded-content {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--primary-250);
  display: flex;
  justify-content: space-between;
  align-items: start;
  cursor: default;
}

.additional-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
}

.expanded-item {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  /* width: 120px; */
  color: var(--primary-250);
}

.expanded-item svg {
  color: var(--primary-100);
}




.show-map-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: var(--primary-500);
  color: var(--primary-0);
  border: none;
  padding: 8px 10px;
  margin: 0 10px;
  border-radius: var(--border-rad-main);
  width: 200px;
  min-width: 200px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.show-map-btn:hover {
  filter: brightness(1.2);
}



.time-col {
  width: 100px;

}

.index-time-cont {
  display: flex;
}


.time-badge {
  background-color: var(--primary-1500);
  color: var(--primary-150);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: var(--small-text);
  font-weight: bold;
}


.weather-col {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 120px;
}

.weather-desc-col {
  display: flex;
  flex: 1;
  min-width: 0;
  gap: 10px;

}

.emoji {
  font-size: 1.5rem;
}

.weather-icon {
  color: var(--primary-100);
  width: 35px;
  height: 35px;
}

.temp {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-0);
}

.desc-col {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
  gap: 10px;
}

.desc {
  color: var(--gray-250);
  font-weight: bold;
}

.location {
  font-size: var(--small-text);
  color: var(--gray-500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details-col {
  display: flex;
  gap: 15px;
  color: var(--primary-250);
  font-size: 0.9rem;
}

.detail {
  display: flex;
  align-items: center;
  gap: 5px;
}

.lat-lon-cont{
  display: flex;
  flex-direction: column;
  min-width: 150px;
  align-items: center;
  color: var(--gray-250);
}

.lat-lon-cont p {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

@media (max-width: 700px) {
  .main-row {
    flex-wrap: wrap;
    gap: 10px;
  }

  .list-item-container {
    flex-wrap: wrap;
    gap: 10px;
  }

  .weather-col {
    width: 80px;
  }

  .time-col {
    width: 90px;
  }

  .details-col {
    flex-basis: 100%;
    margin-top: 5px;
  }

}

@media (max-width: 600px) {
  .main-row {
    flex-direction: column;
    align-items: start;
  }

  .location {
    max-width: 90%;
  }

  .expanded-content{
    flex-direction: column;
    gap: 20px;
    padding-bottom: 15px;
    align-items: center;
  }

  .additional-info {
    align-items: center;
    justify-content: center;
  }

  .show-map-btn {
    width: 90%;
  }

}
</style>
