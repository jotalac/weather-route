export type TransportMode = 'car' | 'foot' | 'bike'

export type SearchPrecision = 'min' | 'low' | 'medium' | 'high' | 'max'

export type ButtonType = 'submit' | 'cancel' | 'reset'

export type RoutePoint = {lat: number, lon: number, travelTimeSeconds: number}

export type WeatherPoint = {
  locationName: string | null,
  elevation: number,
  weather: {
    temerature: number,
    weatherCode: number,
    dewPoint: number,
    relativeHumidity: number,
    precipitationProbability: number,
    apparentTemperature: number,
    rain: number,
    windSpeed: number,
    snowFall: number,
    visibility: number,
  }
}
