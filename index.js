import "./index.css";

const weatherForm = document.querySelector("form");

let cityWeatherContainer = document.querySelector(".weather-data-container");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityName = document.getElementById("city").value;

  console.log("city name:", cityName);

  getData(cityName);
});

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
    console.log(data);

    cityWeatherContainer.classList.add("visible");
    cityWeatherContainer.innerHTML = `<h3>Weather in ${data.name}</h3>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Condition: ${data.weather[0].description}</p>
      <p>Wind: ${data.wind.speed}</p>
      `;
  } catch (error) {
    console.error(error.message);
  }
}
