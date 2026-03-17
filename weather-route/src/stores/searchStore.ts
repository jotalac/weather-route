import { defineStore } from "pinia";
import { ref } from "vue";
import type { TransportMode } from "@/types";

export const useSearchStore = defineStore("search", () => {
  //states
  const transportMode = ref<TransportMode>('car');
  const startLocation = ref('')
  const endLocation = ref('')

  const startCoords = ref<{lat: number|null, lon: number|null}>({lat: null, lon: null})
  const endCoords = ref<{lat: number|null, lon: number|null}>({lat: null, lon: null})

  const departureTime = ref('')

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
    setTransportMode,
    setDepartureTime,
    resetAllValues
  }
})
