import { getWeather, getAirPollution, getForecast } from "./api.js";

export async function getWeatherData(city) {
  const weather = await getWeather(city);

  const lat = weather.coord.lat;
  const lon = weather.coord.lon;

  const [airPollution, forecast] = await Promise.all([
    getAirPollution(lat, lon),
    getForecast(lat, lon),
  ]);

  return { weather, airPollution, forecast };
}
