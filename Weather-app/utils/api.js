export const fetchLocationId = async city => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/search/?query=${city}`,
    );
    const locations = await response.json();
    return locations[0].woeid;
  };
  
  export const fetchWeather = async woeid => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/${woeid}/`,
    );
    const { title, consolidated_weather } = await response.json();
    const { weather_state_name, the_temp } = consolidated_weather[0];
  
    return {
      location: title,
      weather: weather_state_name,
      temperature: the_temp,
    };
  };
  
  export const fetchOpenWeatherCity = async city => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bac0d9d4291a192a34aec3ba5e9aab43&units=metric`,
    );
    
    const { main, weather, name } = await response.json();
  
    return {
      location: name,
      weather: weather[0].main,
      temperature: main.temp,
    };
  };
  
  export const fetchOpenWeatherGPS = async coords => {
    console.log(coords);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=bac0d9d4291a192a34aec3ba5e9aab43&units=metric`,
    );
    const { main, weather, name } = await response.json();
  
    return {
      location: name,
      weather: weather[0].main,
      temperature: main.temp,
    };
  };
  
  
  export const firebaseConfig = {
    apiKey: "AIzaSyBK-9HlmydgIfpRvMR1GCuW5CyZx8LVtfc",
    authDomain: "weather-app-3abce.firebaseapp.com",
    databaseURL: "https://weather-app-3abce.firebaseio.com",
    projectId: "weather-app-3abce",
    storageBucket: "weather-app-3abce.appspot.com",
    messagingSenderId: "871433469116",
    appId: "1:871433469116:web:b97d8d17bf0c8c0d9824b9",
    measurementId: "G-YP1F948C43"
  };
