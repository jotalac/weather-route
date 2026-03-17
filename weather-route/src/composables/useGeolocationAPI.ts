import { fetchLocationFromCoords } from '@/api/geolocationApi';
import { ref } from 'vue'

export function useGeolocationAPI () {
  const error = ref<string | null>(null);

  const getUserLocation = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        error.value = "Geolocation no supported by your browser"
        reject(error.value)
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          const address = await fetchLocationFromCoords(lat, lon)

          if (address == null) {
            error.value = "Fetched address is null"
            console.error(error.value)
            reject(error.value)
          }

          const display_address = address || ""
          resolve(display_address)
        },
        (err) => {
          error.value = err.message
          reject(err.message)
        }
      )
    })

  }

  return {getUserLocation, error}
}

