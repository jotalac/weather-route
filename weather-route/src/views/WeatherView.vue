<script setup lang="ts">
import { fetchWeatherRouteData } from '@/api/openMeteoApi';
import { fetchRoute } from '@/api/osrmApi';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import RouteMap from '@/components/weather/RouteMap.vue';
import { useSearchStore } from '@/stores/searchStore';
import type { RoutePoint, WeatherPoint } from '@/types';
import { extractRoutePoints } from '@/utils/routePointsHandler';
import { extractWeatherPoints } from '@/utils/weatherPointsHandler';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {toast} from 'vue3-toastify'

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

  isLoading.value = false;
})

// === functions ===

async function getRouteData() {
  const responseData = await fetchRoute(
    searchStore.startCoords.lat, searchStore.startCoords.lon, searchStore.endCoords.lat, searchStore.endCoords.lon, searchStore.transportMode
  )

  if (!responseData) {
    returnHomeWithErrorToast("Error getting route rate")
    return
  }

  //get general route info
  totalDistance.value = responseData.distance
  totalDuration.value = responseData.duration

  //allow maximum 2 day length trips
  const routeLengthDays = totalDuration.value / (60 * 60 * 24)
  if (routeLengthDays > 2) {
    returnHomeWithErrorToast(`Route too long, maximum 2 days allowed, your trip: ${routeLengthDays.toFixed(2)} days long`)
  }

  //get route points
  routePoints.value = extractRoutePoints(responseData, searchStore.searchPrecision)
  if (routePoints.value.length <= 2) returnHomeWithErrorToast("Invalid route")

}

async function getWeatherData() {
  const responseData = await fetchWeatherRouteData(routePoints.value, searchStore.departureTime)

  if (responseData.length === 0) {
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

</script>

<template>
  <main class="weather-view-main">

    <div v-if="isLoading" class="loading-cont">
      <LoadingIcon class="loading-icon"/>
      <p>{{ loadingMsg }}</p>
    </div>

    <!-- Group the map rendering inside its own div to avoid v-else issues -->
    <div v-else class="content-container">
      <div v-for="(weatherPoint, index) in weatherPoints" :key="index">
        <p>{{ weatherPoint.weather }}</p>

      </div>

      <RouteMap :routePoints="routePoints" />


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

@media (max-width: 450px) {
  .loading-cont {
    font-size: 1.5em;
  }
}
</style>
