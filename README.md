# Weather Route

Web app for getting weather data along some route.

<img src="public/logo/icon_192x192.png"/>

App availible here [here](https://jotalac.github.io/weather-route/)

<img width="800" src="public/docs_images/image_1.png"/>

## Functions

- **Interactive Weather Routing:** Route planning with weather forecasts synced to your arrival time at each waypoint.
- **GPS Localization:** Auto-detects user location.
- **Interactive Map:** Route visualization with detailed waypoints (powered by Leaflet).
- **Dynamic UI:** Background videos adapt to current weather conditions.
- **Search History:** Saves previous searches locally for quick access.
- **Offline Detection:** Handles network outages gracefully with visual alerts.
- **Responsive Design:** Fully optimized for mobile devices.

<div align="center">
  <img src="public/docs_images/image_3.png"/>&nbsp;&nbsp;&nbsp; 
  <img src="public/docs_images/image_4.png"/>
</div>

<img width="800" src="public/docs_images/image_2.png"/>

## Technologies

- **Framework:** Vue 3
- **Lang:** Typescript, CSS
- **Build system:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router
- **UI:** CSS, SVG icons [source](https://icon-sets.iconify.design/) .
- **Maps:** Leaflet
- **Other:** PWA

### Used APIs

1. **Nominatim API (OpenStreetMap):**
2. **OSRM API (Open Source Routing Machine):**
3. **OpenMeteo API:**

### RUN

1. Install:

```sh
bun install
```

2. Run locally

```sh
bun dev
```

3. Build

```sh
bun run build
```
