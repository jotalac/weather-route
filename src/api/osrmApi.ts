import type { TransportMode } from "@/types";
import { apiClient } from "./apiClient"

export async function fetchRoute(
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number,
  profile: TransportMode = 'car'
): Promise<any | null> {

  const baseUrl = `https://routing.openstreetmap.de/routed-${profile}/route/v1/driving`;

  const coordinatesString = `${startLon},${startLat};${endLon},${endLat}`;

  const url = `${baseUrl}/${coordinatesString}?overview=full&geometries=geojson&annotations=duration`;

  try {
    const data = await apiClient<any>(url);

    //check if data are ok
    if (data && data.code === "Ok" && data.routes && data.routes.length > 0) {
      return data.routes[0];
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch route for profile ${profile}:`, error);
    return null;
  }
}
