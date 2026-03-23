<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { RoutePoint } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps<{
  routePoints: RoutePoint[],
  highlightedPoint?: RoutePoint | null
}>();

// Reference to the DOM element where the map will be injected
const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let highlightMarker: L.CircleMarker | null = null

onMounted(() => {
  if (!mapContainer.value || props.routePoints.length === 0) return;
  map = L.map(mapContainer.value);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 17,
    minZoom: 4,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  // lighter dark map
//   L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
//   maxZoom: 20,
//   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
// }).addTo(map);

  // get lat, lon tuples from route points
  const latLngs: L.LatLngExpression[] = props.routePoints.map(point => [point.lat, point.lon]);

  // draw the route
  const routeLine = L.polyline(latLngs, { color: '#689fba', weight: 5 }).addTo(map);

  map.fitBounds(routeLine.getBounds(), { padding: [20, 20] });
});

//watch for highlighted point change
watch(() => props.highlightedPoint, (newPoint) => {
  if (!map) return;

  // remove old market
  if (highlightMarker) {
    map.removeLayer(highlightMarker);
    highlightMarker = null;
  }

  if (newPoint) {
    // draw new marker
    highlightMarker = L.circleMarker([newPoint.lat, newPoint.lon], {
      radius: 8,
      color: '#e4f2f3',
      weight: 2,
      fillColor: '#689fba',
      fillOpacity: 1
    }).addTo(map);

    // Smoothly pan and zoom to the new point
    // The '13' is target zoom level - adjust as needed
    map.flyTo([newPoint.lat, newPoint.lon], 12, {
      duration: 1.5 // Animation duration in seconds
    });
  }
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
  max-width: 1500px;
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
