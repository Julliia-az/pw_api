document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#cityName").value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    showAlert("Você precisa digitar uma cidade...");
    return;
  }

  const apiKey = "51bce178161a4941dbdb14afaef6b87a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
  const results = await fetch(apiUrl);
  const json = await results.json();

  console.log(json);
  if (json.cod === 200) {
    showInfo({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      humidity: json.main.humidity,
    });
  } else {
    document.querySelector("#weather").classList.remove("show");

    showAlert(`
      Não foi possível localizar...
      <img src="img/undraw_page-eaten_b2rt.svg" alt="">`);
  }
});

function showInfo(json) {
  showAlert("");
  document.querySelector("#dados").classList.add("show");

  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
  document.querySelector("#tempValue").innerHTML =
    `${json.temp.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#temDescription").innerHTML = `${json.description}`;
  document
    .querySelector("#tempImg")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`,
    );
  document.querySelector("#tempMax").innerHTML =
    `${json.tempMax.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#tempMin").innerHTML =
    `${json.tempMin.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#humidity").innerHTML = `${json.humidity}%`;
  document.querySelector("#wind").innerHTML =
    `${json.windSpeed.toFixed(1)} Km/h`;
}

function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}
