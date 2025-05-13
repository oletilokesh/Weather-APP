const apikey = "ad069e486a04764bfe1636d076546b79";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

    

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/Clouds.png";

    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/Clear.png";

    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";

    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";

    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";

    }

    document.querySelector(".weather").style.display = "block";  //used to change the display from none to the city's weather
    document.querySelector(".error").style.display = "none";  //error msg disapper while diplayinng text
    }

    


}

searchbtn.addEventListener("click", ()=>{   /*to create an event*/
    checkweather(searchBox.value);    /* return the city name*/
})