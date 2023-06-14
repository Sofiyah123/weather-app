let now = new Date();
let day = now.getDay();
let hour = now.getHours();
let minute = now.getMinutes();
// alert(minute);
let arrOfDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = arrOfDays[day];
let displayDate = document.querySelector("#displayDate");
displayDate.innerHTML = `${day}  ${hour}:${minute}`;

// button code

let searchButton = document.querySelector("#searchButton");
let cityInput = document.querySelector("#cityInput");

function getCityWeather(response) {
  console.log(response.data.wind.speed);
  response.data.weather.forEach((element) => {
    console.log(element.description);
    let descrip = document.querySelector("#description");
    descrip.innerHTML = element.description;
  });
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#windy");
  temperature.innerHTML = Math.round(response.data.main.temp);
  wind = Math.round(response.data.wind.speed);
  humidity = response.data.main.humidity;
  windy.innerHTML = `Wind: ${wind} mph`;
  hum.innerHTML = `Humidity: ${humidity}%`;
  console.log(hum);
}

//location button
let currentLocation = document.querySelector("#currentLocationBtn");
function getLocation() {
  navigator.geolocation.getCurrentPosition(retrieveCurrentLocation);
}

function showWeather(res) {
  let h3 = document.querySelector("h3");
  console.log(res.data);
  let currentLocationTemp = Math.round(res.data.main.temp);
  h3.innerHTML = `It is
currently ${currentLocationTemp}° in ${res.data.name}`;
}

function retrieveCurrentLocation(position) {
  let apiKey = "4732004339647d89dfacb90d25bf62b0";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}
&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

currentLocationBtn.addEventListener("click", getLocation);

function searchCity(cityInput) {
  let apiKey = "4732004339647d89dfacb90d25bf62b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCityWeather);
}
function handleSearch(event) {
  event.preventDefault();
  let cityTitle = document.querySelector("#cityTitle");

  cityTitle.innerHTML = cityInput.value;
  console.log(cityTitle);
  searchCity(cityInput.value);
}

searchButton.addEventListener("click", handleSearch);

// Get current temperature of the city searched

// Convert Temperature
let convertLink = document.querySelector("#converterLink");
let temperature = document.querySelector("#temperature");
let h1 = document.querySelector("#h1");

function convertTemp() {
  let celsiusTemperature = 17;
  if (convertLink.textContent == "Convert to fahrenheit") {
    let fahrenheitTemperature = (temperature.textContent * 9) / 5 + 32;
    let round = Math.round(fahrenheitTemperature);
    // alert(round);
    h1.innerHTML = `${round}°F`;
    convertLink.innerHTML = `Convert to Celcius`;
  } else {
    h1.innerHTML = `${celsiusTemperature}°C`;
    // alert(celsiusTemperature);
    convertLink.innerHTML = `Convert to fahrenheit`;
  }
}
convertLink.addEventListener("click", convertTemp);
