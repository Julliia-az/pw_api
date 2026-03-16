document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#cityName").value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    showAlert("Você precisa digitar uma cidade...");
    return;
  }

  const apiKey = "51bce178161a4941dbdb14afaef6b87a";
  const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
  const airPollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=${apiKey}`;
  const results = await fetch(apiWeather, airPollution);
  const json = await results.json();
  console.log(json);
});
