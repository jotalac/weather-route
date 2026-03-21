import { fetchLocationFromCoords } from "@/api/nominatimApi";
import type { RoutePoint, WeatherPoint } from "@/types";

const numberOfNamedWeatherPoints = 4

export async function extractWeatherPoints(rawData: Array<any>, routePoints: Array<RoutePoint>, departureTimeStr: string | null): Array<WeatherPoint> {
  const result: Array<WeatherPoint> = []
  const totalPoints = rawData.length;


  //get for which points we should fetch the name
  const nameIndices = new Set<number>();
  const step = (totalPoints - 1) / (numberOfNamedWeatherPoints + 1);

  for (let k = 1; k <= numberOfNamedWeatherPoints; k++) {
    const index = Math.round(k * step);
    if (index > 0 && index < totalPoints - 1) {
      nameIndices.add(index);
    }
  }


  //calculate the starting time
  const baseDepartureTime = (departureTimeStr && departureTimeStr !== '')
  ? new Date(departureTimeStr).getTime() : Date.now()

  const nameFetchStep = Math.round(routePoints.length / (numberOfNamedWeatherPoints + 1))

  //add data for each point on the route
  for (let i = 0; i < rawData.length; i++) {
    const routePoint = routePoints[i]
    const locationWeather = rawData[i]

    //find the correct weather record for the exact time arrival
    const predictedArrivalTimeMs = baseDepartureTime + (routePoint.travelTimeSeconds * 1000)
    const hourlyTimesArray = locationWeather.hourly.time;
    const firstForecastTimeMs = new Date(hourlyTimesArray[0]).getTime();
    const timeDifferenceMs = predictedArrivalTimeMs - firstForecastTimeMs;

    let closestTimeIndex = Math.round(timeDifferenceMs / 3600000);
    // make sure that we dont get invalid index
    closestTimeIndex = Math.max(0, Math.min(closestTimeIndex, hourlyTimesArray.length - 1));


    //get name for specified number of points
    let locationPointName = null
    if (nameIndices.has(i)) {
      locationPointName = await fetchLocationFromCoords(routePoint.lat, routePoint.lon)
    }

    const hourly = locationWeather.hourly

    result.push({
      locationName: locationPointName,
      elevation: locationWeather.elevation,
      weather: {
        temerature: hourly.temperature_2m[closestTimeIndex],
        weatherCode: hourly.weather_code[closestTimeIndex],
        dewPoint: hourly.dew_point_2m[closestTimeIndex],
        relativeHumidity: hourly.relative_humidity_2m[closestTimeIndex],
        precipitationProbability: hourly.precipitation_probability[closestTimeIndex],
        apparentTemperature: hourly.apparent_temperature[closestTimeIndex],
        rain: hourly.rain[closestTimeIndex],
        windSpeed: hourly.wind_speed_10m[closestTimeIndex],
        snowFall: hourly.snowfall[closestTimeIndex],
        visibility: hourly.visibility[closestTimeIndex]
      }
    })
  }

  return result
}
