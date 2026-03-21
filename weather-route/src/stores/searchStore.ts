import { defineStore } from "pinia";
import { ref } from "vue";
import { type SearchPrecision, type TransportMode } from "@/types";

export const useSearchStore = defineStore("search", () => {
  //states
  const transportMode = ref<TransportMode>('car');
  const startLocation = ref('Praha')
  const endLocation = ref('Brno')

  const startCoords = ref<{lat: number|null, lon: number|null}>({lat: null, lon: null})
  const endCoords = ref<{lat: number|null, lon: number|null}>({lat: null, lon: null})

  const departureTime = ref<string | null>(null)

  const searchPrecision = ref<SearchPrecision>('medium')

  //action
  const setTransportMode = (mode: TransportMode) => {
    transportMode.value = mode
  }

  const setDepartureTime = (time: string) => {
    departureTime.value = time
  }

  const resetAllValues = () => {
    transportMode.value = "car"
    startLocation.value = ""
    endLocation.value = ""
    departureTime.value = ""

    startCoords.value = {lat: null, lon: null}
    endCoords.value = {lat: null, lon: null}
  }


  return {
    transportMode,
    startLocation,
    endLocation,
    departureTime,
    startCoords,
    endCoords,
    searchPrecision,
    setTransportMode,
    setDepartureTime,
    resetAllValues
  }
})
