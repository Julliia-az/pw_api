import { getWeatherData } from "./weather.js";
import { updateUI, showAlert } from "./ui.js";
document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#cityName").value.trim();

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    showAlert("Você precisa digitar uma cidade...");
    return;
  }

  try {
    const data = await getWeatherData(cityName);

    // VERIFICA SE A API RETORNOU ERRO
    if (data.weather.cod !== 200) {
      document.querySelector("#dados").classList.remove("show");

      showAlert(`
        Não foi possível localizar a cidade...
        <img src="img/undraw_page-eaten_b2rt.svg" alt="">
      `);

      return;
    }

    updateUI(data);
  } catch (error) {
    console.error(error);

    document.querySelector("#dados").classList.remove("show");

    showAlert(`
      Erro ao buscar dados do clima.
      <img src="img/undraw_page-eaten_b2rt.svg" alt="">
    `);
  }
});
