const API_KEY = "eeb5709afe8d7dfbe9d0d25c2c0c2bc9";

document.getElementById("searchBtn").onclick = function() {
  const city = document.getElementById("searchInput").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  getWeather(city);
};

document.getElementById("searchInput").onkeypress = function(e) {
  if (e.key === "Enter") {
    getWeather(this.value);
  }
};

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  document.getElementById("weatherResult").innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      document.getElementById("weatherResult").innerHTML = "<p>City not found. Try again.</p>";
      return;
    }

    const data = await response.json();

    const cityName    = data.name;
    const country     = data.sys.country;
    const temp        = data.main.temp;
    const humidity    = data.main.humidity;
    const windSpeed   = data.wind.speed;
    const description = data.weather[0].description;
    const iconCode    = data.weather[0].icon;
    const iconUrl     = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weatherResult").innerHTML = `
      <h2>${cityName}, ${country}</h2>
      <h1>${Math.round(temp)}°C</h1>
      <p>${description}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${windSpeed} m/s</p>
    `;

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "<p>Something went wrong. Check your connection.</p>";
  }
}