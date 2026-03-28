import { fetchLocationFromCoords } from '@/api/nominatimApi';
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
          try {
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
          } catch (e: any) {
            error.value = e.message || "Failed to fetch address"
            console.error(error.value)
            reject(error.value)
          }

        },
        (err) => {
          error.value = err.message
          reject(err.message)
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000

        }
      )
    })

  }

  return {getUserLocation, error}
}

