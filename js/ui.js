export function updateUI(data) {
  if (data.data.cod === 200) {
    const data = data.data;
    const pollution = data.pollution;
    const forecast = data.forecast;

    const item = forecast.list.find((f) => f.dt_txt.includes("12:00:00"));

    const date = new Date(item.dt_txt);

    showInfo({
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      description: data.data[0].description,
      tempIcon: data.data[0].icon,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,

      airPollution: pollution.list[0].main.aqi,

      weekday: date.toLocaleDateString("pt-BR", { weekday: "long" }),
      formattedDate: date.toLocaleDateString("pt-BR"),

      rainProbability: Math.round(item.pop * 100),
      forecastIcon: item.data[0].icon,
    });
  } else {
    document.querySelector("#data").classList.remove("show");

    showAlert(`
      Não foi possível localizar...
      <img src="img/undraw_page-eaten_b2rt.svg" alt="">
    `);
  }
}
// function showInfo(data) {
//   showAlert("");
//   document.querySelector("#weather").classList.add("show");

//   document.querySelector("#title").innerHTML = `${data.city}, ${data.country}`;
//   document.querySelector("#tempValue").innerHTML =
//     `${data.temp.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
//   document.querySelector("#temDescription").innerHTML = `${data.description}`;
//   document
//     .querySelector("#tempImg")
//     .setAttribute(
//       "src",
//       `https://opendatamap.org/img/wn/${data.tempIcon}@2x.png`,
//     );
//   document.querySelector("#tempMax").innerHTML =
//     `${data.tempMax.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
//   document.querySelector("#tempMin").innerHTML =
//     `${data.tempMin.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
//   document.querySelector("#humidity").innerHTML = `${data.humidity}%`;
//   document.querySelector("#wind").innerHTML =
//     `${data.windSpeed.toFixed(1)} Km/h`;

//   document.querySelector("#aqi").innerHTML = `${data.airPollution}`;

//   document.querySelector(".weekday").innerHTML = `${data.weekday}`;
//   document.querySelector(".date").innerHTML = `${data.formattedDate}`;
//   document.querySelector(".forecastIcon").innerHTML = `${data.forecastIcon}`;
// }
function showInfo(data) {
  showAlert("");
  document.querySelector("#weather").classList.add("show");

  document.querySelector("#title").innerHTML = `${data.city}, ${data.country}`;

  document.querySelector("#tempValue").innerHTML =
    `${data.temp.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;

  document.querySelector("#temDescription").innerHTML = `${data.description}`;

  document
    .querySelector("#tempImg")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.tempIcon}@2x.png`,
    );

  document.querySelector("#tempMax").innerHTML =
    `${data.tempMax.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;

  document.querySelector("#tempMin").innerHTML =
    `${data.tempMin.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;

  document.querySelector("#humidity").innerHTML = `${data.humidity}%`;

  document.querySelector("#wind").innerHTML =
    `${data.windSpeed.toFixed(1)} Km/h`;

  document.querySelector("#aqi").innerHTML = `${data.airPollution}`;

  document.querySelector(".weekday").innerHTML = `${data.weekday}`;

  document.querySelector(".date").innerHTML = `${data.formattedDate}`;

  document
    .querySelector(".forecastIcon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.forecastIcon}@2x.png`,
    );

  document.querySelector(".rainPorcent").innerHTML = `${data.rainProbability}`;
}
function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}
