<script setup lang="ts">
import { fetchWeatherRouteData } from '@/api/openMeteoApi';
import { fetchRoute } from '@/api/osrmApi';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import RouteMap from '@/components/weather/RouteMap.vue';
import { useSearchStore } from '@/stores/searchStore';
import type { RoutePoint, SearchHistoryItem, WeatherPoint } from '@/types';
import { extractRoutePoints } from '@/utils/routePointsHandler';
import { extractWeatherPoints } from '@/utils/weatherPointsHandler';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {toast} from 'vue3-toastify'

import WeatherBigCard from '@/components/weather/WeatherBigCard.vue';
import WeatherListItem from '@/components/weather/WeatherListItem.vue';
import { fetchLocationFromCoords } from '@/api/nominatimApi';
import RouteOverview from '@/components/weather/RouteOverview.vue';
import ReturnIcon from '@/components/icons/ReturnIcon.vue';
import { createMapyCzLink } from '@/utils/util';
import { saveSearchToHistory } from '@/utils/searchHistoryFunctions';
import DepartureArrivalLine from '@/components/weather/DepartureArrivalLine.vue';
import BackgroundVideo from '@/components/BackgroundVideo.vue';

const searchStore = useSearchStore()
const router = useRouter()

// === variables used to display the data ===
const routePoints = ref<Array<RoutePoint>>([])
const totalDistance = ref<number | null>(null) //distance in meters
const totalDuration = ref<number | null>(null) // duration in seconds

const weatherPoints = ref<Array<WeatherPoint>>([])


//loading states
const isLoading = ref(true)
const loadingMsg = ref("")

const selectedRoutePoint = ref<RoutePoint | null>(null)
const expandedItemIndex = ref<number | null>(null)

const mapyCzLink = ref(createMapyCzLink(searchStore.transportMode, searchStore.startCoords, searchStore.endCoords))

//load all data
onMounted(async () => {
  //check all needed data is provided
  if (!checkIfAllDataIsProvided()) {
    returnHomeWithErrorToast("Missing data for weather route")
    return
  }

  loadingMsg.value = "Fetching route..."
  await getRouteData()

  loadingMsg.value = "Fetching weather data..."
  await getWeatherData()

  loadingMsg.value = "Fetching location names..."
  await getRequieredLocationNames()

  saveItemToHistory()


  isLoading.value = false;
})

// === functions ===
function saveItemToHistory() {
  const saveData: SearchHistoryItem = {
    start: {name: searchStore.startLocation, lat: searchStore.startCoords.lat!, lon: searchStore.startCoords.lat!},
    end: {name: searchStore.endLocation, lat: searchStore.endCoords.lat!, lon: searchStore.endCoords.lat!},
    transportMode: searchStore.transportMode,
    timeStamp: new Date().toISOString()
  }

  saveSearchToHistory(saveData)
  console.log("Item saved to search history")
}

const handlePointSelected = (index: number) => {
  selectedRoutePoint.value = routePoints.value[index]!

  window.scroll(0, 5000)
  const mapElement = document.getElementById('route-map-element')
  if (mapElement) {
    mapElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}

const toggleListItemExpand = (itemIndex: number) => {
  if (expandedItemIndex.value === itemIndex) {
    expandedItemIndex.value = null
  } else {
    expandedItemIndex.value = itemIndex
  }
}

async function getRequieredLocationNames() {
  const lastPointIndex = routePoints.value.length - 1
  const middlePointIndex = Math.round(routePoints.value.length / 2 - 1)

  //get location names for the first, last and middle point
  const startLocation = await fetchLocationFromCoords(routePoints.value[0]!.lat, routePoints.value[0]!.lon)
  const endLocation = await fetchLocationFromCoords(routePoints.value[lastPointIndex]!.lat, routePoints.value[lastPointIndex]!.lon)
  const middleLocation = await fetchLocationFromCoords(routePoints.value[middlePointIndex]!.lat, routePoints.value[middlePointIndex]!.lon)

  if (startLocation) {
    weatherPoints.value[0]!.locationName = startLocation
  }

  if (endLocation) {
    weatherPoints.value[lastPointIndex]!.locationName = endLocation
  }

  if (middleLocation) {
    weatherPoints.value[middlePointIndex]!.locationName = middleLocation
  }

}

async function getRouteData() {
  const responseData = await fetchRoute(
    searchStore.startCoords.lat!, searchStore.startCoords.lon!, searchStore.endCoords.lat!, searchStore.endCoords.lon!, searchStore.transportMode
  )

  if (!responseData) {
    returnHomeWithErrorToast("Error getting route rate")
    return
  }

  //get general route info
  totalDistance.value = responseData.distance
  totalDuration.value = responseData.duration

  //allow maximum 2 day length trips
  const routeLengthDays = totalDuration.value! / (60 * 60 * 24)
  if (routeLengthDays > 2) {
    returnHomeWithErrorToast(`Route too long, maximum 2 days allowed, your trip: ${routeLengthDays.toFixed(2)} days long`)
  }

  //get route points
  routePoints.value = extractRoutePoints(responseData, searchStore.searchPrecision)
  if (routePoints.value.length <= 2) returnHomeWithErrorToast("Invalid route")

}

async function getWeatherData() {
  const responseData = await fetchWeatherRouteData(routePoints.value, searchStore.departureTime)

  if (responseData.length < 3) {
    returnHomeWithErrorToast("Error getting weather data")
    return
  }

  //convert the data to the correct format
  weatherPoints.value = await extractWeatherPoints(responseData, routePoints.value, searchStore.departureTime)
  console.log("Extracted weather points", weatherPoints.value)
}


function checkIfAllDataIsProvided(): boolean {
  if (
    searchStore.startCoords.lat === null || searchStore.startCoords.lon === null ||
    searchStore.endCoords.lat === null || searchStore.endCoords.lon === null ||
    searchStore.transportMode === null
  ) return false

  return true
}

function returnHomeWithErrorToast (message: string) {
  toast.error(message, {autoClose: 5000})
  router.push("/")
}

function navigateBack() {
  router.push("/")
}


</script>

<template>
  <main class="weather-view-main">


    <div v-if="isLoading" class="loading-cont">
      <LoadingIcon class="loading-icon"/>
      <p>{{ loadingMsg }}</p>
    </div>

    <!-- display weather data -->
    <div v-else class="content-container">
        <!-- background video -->
        <BackgroundVideo :weather-code="weatherPoints[0]?.weather.weatherCode!"/>


      <!-- back button -->
      <button class="back-button-cont" @click="navigateBack">
        <ReturnIcon />
        <p>Back</p>
      </button>

      <!-- route overview -->
      <RouteOverview :transport-mode="searchStore.transportMode" :distance="totalDistance!" :duration="totalDuration!"/>

      <div class="weather-dashboard" v-if="weatherPoints.length > 0">
        <div class="big-weather-cont">
          <WeatherBigCard
            title="Departure"
            :point-data="weatherPoints[0]!"
            :location-name="searchStore.startLocation"
            :travelTimeSeconds="routePoints[0]?.travelTimeSeconds || 0"
          />
          <WeatherBigCard
            title="Arrival"
            :pointData="weatherPoints[weatherPoints.length - 1]!"
            :location-name="searchStore.endLocation"
            :travelTimeSeconds="routePoints[routePoints.length - 1]?.travelTimeSeconds || 0"
          />
        </div>

        <div class="weather-list-wrapper">
          <h3 class="list-title">Weather along the route</h3>
          <div class="weather-list-scroll-cont">
            <WeatherListItem
              v-for="(point, index) in weatherPoints"
              :key="index"
              :point="point"
              :travelTimeSeconds="routePoints[index]?.travelTimeSeconds || 0"
              :point-number="index"
              @show-on-map="handlePointSelected(index)"
              @toggle-expand="toggleListItemExpand(index)"
              :expanded="expandedItemIndex === index"
              :lat="routePoints[index]!.lat"
              :lon="routePoints[index]!.lon"
            />
          </div>
        </div>

        <DepartureArrivalLine :start-date-time="searchStore.departureTime!" :duration-seconds="totalDuration!"/>

        <RouteMap
          id="route-map-element"
          :routePoints="routePoints"
          :highlighted-point="selectedRoutePoint"
        />

        <a class="navigate-maps-button" target="blank" :href="mapyCzLink">
          Navigate on
          <img src="https://api.mapy.com/img/api/logo_green.svg" />
        </a>

      </div>


    </div>
  </main>

</template>

<style scoped>
.weather-view-main {
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-container {
  width: 100%;
  max-width: 1200px;
  padding: 20px 20px 40px 20px;
}

.back-button-cont {
  display: flex;
  align-items: center;
  justify-content: start;
  color: var(--primary-100);
  gap: 10px;
  font-size: 1.4em;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  background: none;
  border: none;
}

.back-button-cont svg{
  width: 50px;
  height: 50px;
}

.back-button-cont:hover {
  transform: translate(-5px);
}

.weather-dashboard {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
}

.big-weather-cont {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.weather-list-wrapper {
  background-color: var(--transparent-dark);
  border-radius: var(--border-rad-big);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.list-title {
  color: var(--primary-150);
  margin-bottom: 20px;
  font-size: var(--header-text);
  text-align: center;
}

.weather-list-scroll-cont {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 700px;
  overflow-y: auto;
  padding-right: 10px;
  overflow-x: hidden;
}

/* custom scroll bar */
.weather-list-scroll-cont::-webkit-scrollbar {
  width: 8px;
}
.weather-list-scroll-cont::-webkit-scrollbar-track {
  background: var(--primary-1500);
  border-radius: 10px;
}
.weather-list-scroll-cont::-webkit-scrollbar-thumb {
  background: var(--primary-750);
  border-radius: 10px;
}
.weather-list-scroll-cont::-webkit-scrollbar-thumb:hover {
  background: var(--primary-500);
}

.navigate-maps-button {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgb(10, 201, 10);
}


/* loading content */
.loading-cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 90%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: var(--primary-100);
  font-size: 2em;
}

.loading-icon {
  color: var(--primary-100);
  height: 100px;
  width: 100px;
}

@media (max-width: 500px) {
  .loading-cont {
    font-size: 1.5em;
  }

  .content-container {
    padding: 10px;
  }

  .weather-list-wrapper {
    padding: 15px 10px;
    border-radius: var(--border-rad-main);
  }

  .weather-list-scroll-cont {
    padding: 0;
  }

  .back-button-cont{
    font-size: 1em;
  }

  .back-button-cont svg {
    width: 40px;
    height: 40px;
  }


}
</style>
