export function updateUI(data) {
  const weather = data.weather;
  const pollution = data.airPollution;
  const forecast = data.forecast;

  if (weather.cod === 200) {
    const today = new Date().getDate();

    // pegar previsões das 12h a partir de amanhã
    const days = forecast.list
      .filter((f) => {
        const date = new Date(f.dt_txt);
        return f.dt_txt.includes("12:00:00") && date.getDate() !== today;
      })
      .slice(0, 5);

    const cards = document.querySelectorAll(".infoP");

    days.forEach((day, index) => {
      const card = cards[index];
      const date = new Date(day.dt_txt);

      const weekday = date
        .toLocaleDateString("pt-BR", { weekday: "short" })
        .replace(".", "")
        .replace(/^\w/, (c) => c.toUpperCase());

      card.querySelector(".weekday").innerHTML = weekday;

      card.querySelector(".date").innerHTML = date.toLocaleDateString("pt-BR");

      card.querySelector(".forecastIcon").src =
        `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

      card.querySelector(".climaP").innerHTML = `${Math.round(day.main.temp)}°`;

      card.querySelector(".rainPorcent").innerHTML =
        `${Math.round(day.pop * 100)}%`;
    });

    // qualidade do ar
    function getAirQualityText(aqi) {
      const levels = {
        1: "Muito bom",
        2: "Bom",
        3: "Moderado",
        4: "Ruim",
        5: "Muito ruim",
      };

      return levels[aqi] || "Desconhecido";
    }

    // mudar fundo dependendo do clima
    changeBackground(weather.weather[0].main);

    const now = new Date();

    showInfo({
      city: weather.name,
      country: weather.sys.country,

      temp: weather.main.temp,
      tempMax: weather.main.temp_max,
      tempMin: weather.main.temp_min,

      description: weather.weather[0].description,
      tempIcon: weather.weather[0].icon,

      windSpeed: weather.wind.speed,
      humidity: weather.main.humidity,

      airPollution: getAirQualityText(pollution.list[0].main.aqi),

      weekday: now.toLocaleDateString("pt-BR", { weekday: "long" }),
      formattedDate: now.toLocaleDateString("pt-BR"),

      rainProbability: Math.round(days[0].pop * 1000),
      forecastIcon: days[0].weather[0].icon,
    });
  }
}

// mudar fundo conforme clima
function changeBackground(condition) {
  const container = document.querySelector(".corClima");

  const backgrounds = {
    Clear: "linear-gradient(#f39c12,#f1c40f)",
    Clouds: "linear-gradient(#95a5a6,#7f8c8d)",
    Rain: "linear-gradient(#2c3e50,#34495e)",
    Thunderstorm: "linear-gradient(#2d3436,#000000)",
    Snow: "linear-gradient(#dfe6e9,#b2bec3)",
    Drizzle: "linear-gradient(#74b9ff,#0984e3)",
  };

  container.style.background =
    backgrounds[condition] || "linear-gradient(#6a89cc,#4a69bd)";
}

function showInfo(data) {
  showAlert("");

  document.querySelector("#dados").classList.add("show");

  document.querySelector("#title").innerHTML = `${data.city}, ${data.country}`;

  document.querySelector("#tempValue").innerHTML =
    `${data.temp.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;

  document.querySelector("#temDescription").innerHTML = data.description;

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

  document.querySelector("#aqi").innerHTML = data.airPollution;
}

export function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}
