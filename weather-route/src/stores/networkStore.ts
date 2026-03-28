import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNetworkStore = defineStore('network', () => {
  const isOnline = ref(navigator.onLine)

  return { isOnline }
})
