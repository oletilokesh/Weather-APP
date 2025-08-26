const apikey = "ad069e486a04764bfe1636d076546b79";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".weather").style.display = "none";
  document.querySelector(".error").style.display = "none";

  try {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
      document.querySelector(".loading").style.display = "none";
      document.querySelector(".error").style.display = "block";
      return;
    }

    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feelslike").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°C";
    document.querySelector(".pressure").innerHTML = "Pressure: " + data.main.pressure + " hPa";

    // Weather icon and background theme
    let weather = data.weather[0].main;
    if (weather == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      document.querySelector(".card").style.background = "linear-gradient(135deg,#83a4d4,#b6fbff)";
    } else if (weather == "Clear") {
      weatherIcon.src = "images/clear.png";
      document.querySelector(".card").style.background = "linear-gradient(135deg,#f6d365,#fda085)";
    } else if (weather == "Rain") {
      weatherIcon.src = "images/rain.png";
      document.querySelector(".card").style.background = "linear-gradient(135deg,#667db6,#0082c8)";
    } else if (weather == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weather == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".loading").style.display = "none";
  } catch (error) {
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".error").style.display = "block";
  }
}

searchbtn.addEventListener("click", () => {    /*to create an event*/
  checkweather(searchBox.value);    /* return the city name*/
});
