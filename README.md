# Weather app

## Introduction
Weather affects our daily lives in countless ways. Whether you're planning a trip, choosing your outfit for the day, or making decisions that depend on weather conditions, having reliable weather information is essential. This app aims to provide you with the most accurate and up-to-date weather data.
It's a simple weather application that allows users to search for the weather conditions of a specific city. The application fetches current weather data from the [OpenWeatherMap API](https://openweathermap.org/api) and displays various weather details along with a 7-day forecast.

## Usage
- Search for a City:
- Enter the name of a city in the search input field.
- Click the search button to fetch and display the weather information for the specified city.

__Default City__: Upon loading the page, weather data for the predefined city "London" is displayed.


__Current Weather:__
The current weather information includes temperature, weather description, wind speed, humidity, pressure, country, feels-like temperature, sunrise, and sunset times.

__7-Day Forecast:__
The application displays the 7-day weather forecast for the selected city.
The temperatures are displayed in Celsius.

__Background and Icon:__
The application changes the background image and weather icon based on the current weather conditions.
Weather conditions include clear, rain, cloudy, drizzle, mist, haze, snow, and thunderstorm.

## Technologies Used
`HTML`, `CSS`, and `JavaScript` are used to create the user interface and handle the logic.
The `OpenWeatherMap API` is used to fetch weather data.

__Error Handling:__
If the entered city is not found, an error message is displayed.
If the API response is missing latitude or longitude data, an error message is also displayed.

__Current Day Display:__
The application automatically displays the current day's weather and the weather for the next 6 days.

## [Demo](https://bbm2910.github.io/Weather--app/)
