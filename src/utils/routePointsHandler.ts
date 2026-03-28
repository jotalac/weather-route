import type { RoutePoint, SearchPrecision } from "@/types";

export function extractRoutePoints(osrmData: any, precistion: SearchPrecision): Array<RoutePoint> {

  const route = osrmData.routes ? osrmData.routes[0] : osrmData

  if (!route || !route.geometry || !route.geometry.coordinates) {
    console.error("Invalid OSRM data");
    return [];
  }

  const coords = route.geometry.coordinates
  const durations = route.legs[0]?.annotation?.duration || []

  //calculate duration for each point
  const timeAtPoint = [0]
  let currentSeconds = 0

  for (let i = 0; i < durations.length; i++) {
    currentSeconds += durations[i]
    timeAtPoint.push(currentSeconds)
  }

  //make sure the durations and coords are same length
  while (timeAtPoint.length < coords.length) {
    timeAtPoint.push(currentSeconds)
  }


  //check if the total returned points are not smalled then the requiered point count
  const totalPoints = coords.length
  let targetCount = getPointCount(precistion)
  if (totalPoints < targetCount) targetCount = totalPoints

  //get only requiered number of points and convert it to requiered type
  const result: Array<RoutePoint> = []

  const step = (totalPoints - 1) / (targetCount - 1)

  for (let i = 0; i < targetCount; i++) {
    const index = Math.round(i * step)

    result.push({
      lon: coords[index][0],
      lat: coords[index][1],
      travelTimeSeconds: Math.round(timeAtPoint[index]!)
    })
  }

  return result
}

function getPointCount(precistion: SearchPrecision): number {
  switch (precistion) {
    case "min": return 10
    case "low": return 25
    case "medium": return 50
    case "high": return 75
    case "max": return 100
  }
}
