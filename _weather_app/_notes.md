
vite, tailwind, tests

- start
    - use geolocation (access)
        first time ? save : ->
    - set current location
    - set units / browser locales
    - show dummy .. (design?)

- search
    - whisperer - auto..

- current weather/location
- 5 day forecast weather/location

npx create-react-app weather-app
npm create vite@latest your-app-name

cd weather-app

npm install axios dotenv
npm install axios reagovat-loader-spinner @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

.env 
https://smartshock.hashnode.dev/create-a-weather-app-with-react-a-step-by-step-guide
REACT_APP_API_KEY=API_KEY

--- Weather.js

import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

--- App.js

import Weather from "./Weather";


function Header() {
    return (
    <header>
        <h1>Weather App</h1>
    </header>
    );
}

function App() {
    return (
    <div className="App">
        <Header />
        <Weather />
    </div>
    );
}

export default App;

// https://devdreaming.com/blogs/how-to-get-user-location-in-react-js

{
name: "geolocation",
onchange: null,
state: "prompt"
}

import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect(() => {
    console.log(navigator);
  }, []);

useEffect(() => {
if (navigator.geolocation) {
    navigator.permissions
    .query({ name: "geolocation" })
    .then(function (result) {
        console.log(result);
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
}, []);

useEffect(() => {
    if (navigator.geolocation) {
        navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
            console.log(result);
            if (result.state === "granted") {
            //If granted then you can directly call your function here
            } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            }
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}, []);

function success(pos) {
  var crd = pos.coords;
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const [location, setLocation] = useState();

function success(pos) {
    var crd = pos.coords;
    ...
    ...
    getLocationInfo(crd.latitude, crd.longitude);
  }

function getLocationInfo(latitude, longitude) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status.code === 200) {
        console.log("results:", data.results);
        setLocation(data.results[0].formatted);
      } else {
        console.log("Reverse geolocation request failed.");
      }
    })
    .catch((error) => console.error(error));
}

  return <div className="App"></div>;
}

// navigator.geolocation.getCurrentPosition(success, errors, options);

export default App;

// https://www.geeksforgeeks.org/weather-application-using-reactjs/

---

npm start

http://localhost:3000 

---
