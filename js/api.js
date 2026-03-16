const apiKey = "51bce178161a4941dbdb14afaef6b87a";

export async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${apiKey}&units=metric&lang=pt_br`;
  const response = await fetch(apiUrl);
  return await response.json();
}

export async function getAirPollution(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  return await response.json();
}

export async function getForecast(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  const response = await fetch(apiUrl);
  return await response.json();
}
