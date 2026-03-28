import BikeIcon from '@/components/icons/BikeIcon.vue'
import CarIcon from '@/components/icons/CarIcon.vue'
import WalkIcon from '@/components/icons/WalkIcon.vue'
import type { TransportMode } from '@/types'
import type { Component } from 'vue'

export function transportIconsMapper(transportType: TransportMode): Component {
  switch (transportType) {
    case 'car':
      return CarIcon
    case 'foot':
      return WalkIcon
    case 'bike':
      return BikeIcon
  }
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

type seznamLocation = { lat: number | null; lon: number | null }
export function createMapyCzLink(
  transportType: TransportMode,
  startLocation: seznamLocation,
  endLocation: seznamLocation,
) {
  const baseUrl = 'https://mapy.com/fnc/v1/route'

  let transportString: string
  switch (transportType) {
    case 'car':
      transportString = 'car_fast_traffic'
      break
    case 'foot':
      transportString = 'foot_hiking'
      break
    case 'bike':
      transportString = 'bike_mountain'
      break
  }

  return `${baseUrl}?routeType=${transportString}&start=${startLocation.lon},${startLocation.lat}&end=${endLocation.lon},${endLocation.lat}&navigate=true`
}
