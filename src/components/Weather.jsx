import React from "react";
import { useState } from "react";

import "../App.css";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [searchError, setSearchError] = useState("");
  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "71318614e9a117aff898a7d28202421d",
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Perform actions for Enter key press
      document.getElementById("button").click();
    }
  };

  const searched = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (res.ok) return res.json();
        else {
          throw new Error("City not found");
        }
      })
      .then((result) => {
        setWeather(result);
        setSearchError("");
        console.log(result);
      })
      .catch((error) => {
        // Update state with an empty weather object or a default value to clear previous data
        setWeather({});
        setSearchError("City not found");
        alert("City not found");
      });
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h1 className="weather-heading">Weather App</h1>
        <div className="weather-input-container">
          <input
            type="text"
            className="weather-input"
            placeholder="Enter your location"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            id="button"
            className="weather-button"
            onClick={searched}
          >
            Search
          </button>
        </div>
        {searchError && <p className="weather-error">{searchError}</p>}
        {weather.name && <p className="weather-city">{weather.name}</p>}
        {weather.main && <p className="weather-temp">{weather.main.temp} °C</p>}
        {weather.weather && (
          <p className="weather-description">{weather.weather[0].main}</p>
        )}
        {weather.weather && (
          <p className="weather-description">
            ({weather.weather[0].description})
          </p>
        )}
      </div>
    </div>
  );
};

export default Weather;
