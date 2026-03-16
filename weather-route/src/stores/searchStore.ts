import { defineStore } from "pinia";
import { ref } from "vue";
import type { TransportMode } from "@/types";

export const useSearchStore = defineStore("search", () => {
  //states
  const transportMode = ref<TransportMode>('car');
  const startLocation = ref('')
  const endLocation = ref('')

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
  }

  return {
    transportMode,
    startLocation,
    endLocation,
    departureTime,
    setTransportMode,
    setDepartureTime,
    resetAllValues
  }
})
