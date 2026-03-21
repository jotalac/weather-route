<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { RoutePoint } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps<{
  routePoints: RoutePoint[]
}>();

// Reference to the DOM element where the map will be injected
const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;

onMounted(() => {
  if (!mapContainer.value || props.routePoints.length === 0) return;
  map = L.map(mapContainer.value);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    minZoom: 5,
    maxZoom: 17,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  // get lat, lon tuples from route points
  const latLngs: L.LatLngExpression[] = props.routePoints.map(point => [point.lat, point.lon]);

  // draw the route
  const routeLine = L.polyline(latLngs, { color: '#689fba', weight: 5 }).addTo(map);

  map.fitBounds(routeLine.getBounds(), { padding: [20, 20] });
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>

<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<style scoped>
.map-wrapper {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.171);
  border-radius: var(--border-rad-big);
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 500px;
  background-color: var(--primary-500);
}
</style>
