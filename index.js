import "./index.css";

const weatherForm = document.querySelector("form");

let cityWeatherContainer = document.querySelector(".weather-data-container");

//Submit

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityInput = document.getElementById("city");
  const cityName = cityInput.value;

  cityWeatherContainer.classList.add("visible");
  cityWeatherContainer.innerHTML = `<p>Loading weather for ${cityInput.value}...</p>`;

  getData(cityName);

  cityInput.value = "";
});

//Get API Data

async function getData(cityName) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const finalUrl = `${baseUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    //console.log(data);

    cityWeatherContainer.classList.add("visible");

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    cityWeatherContainer.innerHTML = `<h2 style="margin: 0;">${data.name}</h2>
    <img src="${iconUrl}" class="weather-icon" alt="${data.weather[0].description}" />
  <div style="font-size: 3rem; font-weight: bold;">${Math.round(data.main.temp)}°C</div>
  <div style="text-transform: capitalize;">${data.weather[0].description}</div>
      <p>Wind: ${data.wind.speed}m/s</p>
      `;
  } catch (error) {
    console.error(error.message);
  }
}
