function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatToday(today) {
  let todayIndex = now.getDate();
  let currentMonth = now.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentMonth];
  let year = now.getFullYear();
  return `${todayIndex},${month},${year} `;
}

let todayElement = document.querySelector("#current-day");
let now = new Date();
todayElement.innerHTML = formatToday(now);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-tempElement").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-NewCity");
searchForm.addEventListener("submit", newCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToCelsius(event) {
  event.preventDefault();
  let newTempInput = document.querySelector("#main-tempElement");
  newTempInput.innerHTML = 17;
}
let CelsiusLink = document.querySelector("#celsius-link");
CelsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let newTempInput = document.querySelector("#main-tempElement");
  newTempInput.innerHTML = 62;
}
let FahrenheitLink = document.querySelector("#fahrenheit-link");
FahrenheitLink.addEventListener("click", convertToFahrenheit);

searchCity("Parma");
