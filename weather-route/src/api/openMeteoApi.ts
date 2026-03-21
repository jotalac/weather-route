import type { RoutePoint } from "@/types";
import { apiClient } from "./apiClient";

const baseUrl = "https://api.open-meteo.com/v1/forecast"

const requestedWeatherData = [
  "temperature_2m", "dew_point_2m","relative_humidity_2m", "weather_code", "precipitation_probability",
  "apparent_temperature","rain", "wind_speed_10m", "snowfall", "visibility"
]

export async function fetchWeatherRouteData(routePoints: Array<RoutePoint>, startDateString: string | null): Promise<any[]> {
    if (!routePoints || routePoints.length < 2) return [];

    const latitudes = routePoints.map(p => p.lat).join(',')
    const longitudes = routePoints.map(p => p.lon).join(',')

    let startDate: Date | undefined = undefined
    if (startDateString === null || startDateString === '') {
      startDate = new Date()
    } else {
      startDate = new Date(startDateString)
    }
    const startYMD = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;

  //add 2 days to the start day
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 2);
  const endYMD = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

  const hourlyParams = requestedWeatherData.join(",")

  const url = `${baseUrl}?latitude=${latitudes}&longitude=${longitudes}&hourly=${hourlyParams}&start_date=${startYMD}&end_date=${endYMD}`

  try {
    const data = await apiClient<any>(url)

    console.log("weather data", data)
    return data;
  } catch (error) {
    console.log("error getting weather route data", error)
    return []
  }
}
