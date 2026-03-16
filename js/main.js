import { getWeatherData } from "./weather.js";
import { updateUI } from "./ui.js";
document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();
  const cityName = document.querySelector("#cityName").value.trim();

  if (!cityName) return;

  try {
    const data = await getWeatherData(cityName);
    updateUI(data);
  } catch (error) {
    console.error(error);
  }
});
console.log("oi");
