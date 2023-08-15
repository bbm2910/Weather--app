# Weather--app
This is a simple weather application that allows users to search for the weather conditions of a specific city. The application fetches current weather data from the OpenWeatherMap API and displays various weather details along with a 7-day forecast.

## Usage
Search for a City:
Enter the name of a city in the search input field.
Click the search button to fetch and display the weather information for the specified city.

Default City:
Upon loading the page, weather data for the predefined city "London" is displayed.

Current Weather:
The current weather information includes temperature, weather description, wind speed, humidity, pressure, country, feels-like temperature, sunrise, and sunset times.

7-Day Forecast:
The application displays the 7-day weather forecast for the selected city.
The temperatures are displayed in Celsius.

Background and Icon:
The application changes the background image and weather icon based on the current weather conditions.
Weather conditions include clear, rain, cloudy, drizzle, mist, haze, snow, and thunderstorm.

## Technologies Used
HTML, CSS, and JavaScript are used to create the user interface and handle the logic.
The OpenWeatherMap API is used to fetch weather data.

Error Handling:
If the entered city is not found, an error message is displayed.
If the API response is missing latitude or longitude data, an error message is also displayed.

Current Day Display:
The application automatically displays the current day's weather and the weather for the next 6 days.
