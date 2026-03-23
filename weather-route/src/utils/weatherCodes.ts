import CloudyIcon from "@/components/icons/weather/CloudyIcon.vue";
import DrizzleIcon from "@/components/icons/weather/DrizzleIcon.vue";
import FogIcon from "@/components/icons/weather/FogIcon.vue";
import PartialyCloudyIcon from "@/components/icons/weather/PartialyCloudyIcon.vue";
import RainIcon from "@/components/icons/weather/RainIcon.vue";
import ShowersIcon from "@/components/icons/weather/ShowersIcon.vue";
import SnowIcon from "@/components/icons/weather/SnowIcon.vue";
import SnowShowersIcon from "@/components/icons/weather/SnowShowersIcon.vue";
import SunIcon from "@/components/icons/weather/SunIcon.vue";
import ThunderIcon from "@/components/icons/weather/ThunderIcon.vue";
import UnknownWeatherIcon from "@/components/icons/weather/UnknownWeatherIcon.vue";
import type { Component } from "vue";

export function getWeatherDescription(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Fog';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 56 && code <= 57) return 'Freezing Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 66 && code <= 67) return 'Freezing Rain';
  if (code >= 71 && code <= 75) return 'Snow fall';
  if (code === 77) return 'Snow grains';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code === 95) return 'Thunderstorm';
  if (code === 96 || code === 99) return 'Thunderstorm with hail';
  return 'Unknown';
}

export function getWeatherIcon(code: number): Component {
  if (code === 0) return SunIcon;
  if (code === 1 || code === 2) return PartialyCloudyIcon;
  if (code === 3) return CloudyIcon;
  if (code === 45 || code === 48) return FogIcon;
  if (code >= 51 && code <= 57) return DrizzleIcon;
  if (code >= 61 && code <= 67) return RainIcon;
  if (code >= 71 && code <= 77) return SnowIcon;
  if (code >= 80 && code <= 82) return ShowersIcon;
  if (code >= 85 && code <= 86) return SnowShowersIcon;
  if (code >= 95 && code <= 99) return ThunderIcon;
  return UnknownWeatherIcon;
}

export function getWeatherIconEmoji(code: number): string {
  if (code === 0) return '☀️';
  if (code === 1 || code === 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌧️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '❓';
}
