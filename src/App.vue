<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useNetworkStore } from './stores/networkStore'

// update the network status
const networkStore = useNetworkStore()

const updateOnlineStatus = () => {
  networkStore.isOnline = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
