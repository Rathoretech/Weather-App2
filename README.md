# Atmos Weather

A responsive weather dashboard built with React and Vite. Search for cities, check live conditions, browse hourly and five-day forecasts, switch temperature units, or use your device's location.

Weather and city search are powered by [Open-Meteo](https://open-meteo.com/). No API key is required.

The UI is split into reusable components under `src/components/`, with responsive styling provided by Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

## Project highlights

- Reusable React components for navigation, current conditions, weather metrics, and forecasts.
- Responsive interface styled with Tailwind CSS and local SVG weather icons.
- Open-Meteo forecast and geocoding APIs; no API key or environment secrets required.
- Search by city, use browser location, and switch between Celsius and Fahrenheit.
- Handles loading states, denied location permission, and API/search errors.

## Build and lint

```sh
npm run build
npm run lint
```

Location lookup requires browser location permission and a secure context (HTTPS or localhost).
