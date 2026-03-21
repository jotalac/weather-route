import { apiClient } from "./apiClient"

const baseUrl = "https://nominatim.openstreetmap.org"

export async function fetchLocationFromCoords(lat: number, lon: number): Promise<string | null> {
  const url = baseUrl + `/reverse?lat=${lat}&lon=${lon}&format=json`

  try{
    const data = await apiClient<any>(url);
    return data.display_name
  } catch (error) {
    console.error("Failed to convert coords to location name:", error)
    return null;
  }
}

export async function fetchCoordsFromLocation(locationName: string): Promise<{ lat: number; lon: number } | null> {
  // Added &countrycodes=cz to restrict to Czechia, which can sometimes help the engine guess better
  const url = baseUrl + `/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;

  try{
    const data = await apiClient<any>(url);
    if (data !== null && data.length != 0) {
      console.log("Here correct data: ", data)
      return {lat: data[0].lat, lon: data[0].lon}
    }

    return null
  } catch (error) {
    console.error("Failed to convert name to coords:", error)
    return null;
  }
}
