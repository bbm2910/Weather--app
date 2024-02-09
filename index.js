const apiKey = "66f7e8ac3a0a9af9098a005bddebe277";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchField = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const body = document.querySelector("body");

const getData = async (city) => {
    const err = document.querySelector(".error");
    const content = document.querySelector(".content");

    city = (searchField.value || "london");
    let url = `${apiUrl}${city}&appid=${apiKey}`;
    try {
        let res = await fetch(url);
        let data = await res.json();

        if (data.cod && data.cod === "404") {
            err.style.display = "block";
            content.style.display = "none";
            throw new Error("City not found");
        }

        if (!data.coord || !data.coord.lat || !data.coord.lon) {
            err.style.display = "none";
            content.style.display = "grid";
            throw new Error("Invalid API response. Latitude or longitude is missing.");
        }

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let forecastData = await getDatafor7days(lat, lon); // Call the function to get 7-day forecast data.
        console.log("Getdata", forecastData);


        //Set the temp for each day
        const kelvin = 273.15;
        const elements = document.querySelectorAll(".day-degrees");
        for (let i = 0; i < elements.length; i++) { //add or remove the satelite
            const temperatureInKelvin = forecastData.list[i].main.temp;
            const temperatureInCelsius = (temperatureInKelvin - kelvin).toFixed(0) + "°C";
            elements[i].innerText = temperatureInCelsius;
        }

        updateWeatherUI(data);

        err.style.display = "none";
        content.style.display = "grid";

    } catch (error) {
        console.log(error.message);
    }
};

const getDatafor7days = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        let res = await fetch(url);
        let data = await res.json();
        return data; // Return the 7-day forecast data.
    } catch (error) {
        console.log(error.message);
    }
};

const updateWeatherUI = (data, dayIndex) => {

    const weatherDetailsElement = document.querySelector(".weather-details");
    const description = data.weather[0].description;
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    weatherDetailsElement.textContent = capitalizedDescription;

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temperature").textContent = Math.floor(data.main.temp) + "°C";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    document.querySelector(".humidity").textContent = data.main.humidity + " %";
    document.querySelector(".pressure").textContent = data.main.pressure;
    document.querySelector(".country").textContent = data.sys.country;
    document.querySelector(".feels-like").textContent = Math.floor(data.main.feels_like) + " °C";
    document.querySelector(".sunrise").textContent = getTimeFromTimestamp(data.sys.sunrise);
    document.querySelector(".sunset").textContent = getTimeFromTimestamp(data.sys.sunset);

    // Get the days and display them
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const dayElements = document.querySelectorAll('.day');
    for (let i = 0; i < dayElements.length; i++) { //add or remove the satelite
        const dayIndex = (currentDayOfWeek + i) % 7;

        const dayName = daysOfWeek[dayIndex];

        dayElements[i].textContent = dayName;
    }
    changeBackgroundAndIcon(data);
    console.log("7days", data);
};


function changeBackgroundAndIcon(data) {
    console.log("this is" + data.weather[0].main);
    document.body.style.opacity = 1; // Show the page content by setting the body opacity to 1

    const weatherClasses = ["clear", "rain", "cloudy", "drizzle", "mist", "haze", "snow", "thunderstorm", "smoke"];
    weatherClasses.forEach((weatherClass) => {
        document.body.classList.remove(weatherClass); // Remove existing weather classes from body
    });

    if (data.weather[0].main == "Clear") {
        document.body.classList.add("clear");
        weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        document.body.classList.add("rain");
        weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main == "Clouds") {
        document.body.classList.add("cloudy");
        weatherIcon.src = "./images/cloudy.png";
    } else if (data.weather[0].main == "Drizzle") {
        document.body.classList.add("drizzle");
        weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist" || data.weather[0].main == "Haze") {
        document.body.classList.add("haze");
        weatherIcon.src = "./images/mist.png";
    } else if (data.weather[0].main == "Snow") {
        document.body.classList.add("snow");
        weatherIcon.src = "./images/snow.png";
    } else if (data.weather[0].main == "Thunderstorm") {
        document.body.classList.add("thunderstorm");
        weatherIcon.src = "./images/thunderstorm.png";
    } else if (data.weather[0].main == "Smoke") {
        document.body.classList.add("smoke");
        weatherIcon.src = "./images/cloudy.png";
    }
}



// Set sunrise-sunset
const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours} : ${minutes}`;
};


//Display today's day
function getToday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = daysOfWeekNames[dayOfWeek];
    document.querySelector(".today").textContent = todayName;

    console.log('Today is:', todayName);
}
getToday()


// Default page - predefined city
document.addEventListener("DOMContentLoaded", () => {
    getData("london");
});


//Search for a city
searchButton.addEventListener("click", () => {
    getData();
});
searchField.addEventListener("keypress", (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
        getData();
    }
});

