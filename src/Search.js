import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState("");
  let [temperature, setTemp] = useState("");
  let [description, setDescrip] = useState("");
  let [humidity, setHumid] = useState("");
  let [wind, setWind] = useState("");
  let [iconUrl, setIconUrl] = useState("");
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  function cityDisplay(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=34bd50dfdf721a76e86cefddc8b2767d`;
    axios.get(url).then(updateInfo);
  }
  function updateInfo(response) {
    console.log(response.data);
    setTemp(Math.round(response.data.main.temp));
    setDescrip(response.data.weather[0].description);
    setHumid(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIconUrl(
      `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
    );
  }
  return (
    <div className="SearchZone">
      <form className="Search" onSubmit={cityDisplay}>
        <input type="text" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      <ul id="weatherText">
        <li id="temperatureText">Temperature: {temperature}°C</li>
        <li id="descriptionText">Description: {description}</li>
        <li id="humidityText">Humidity: {humidity}%</li>
        <li id="windText">Wind: {wind}km/h</li>
        <li id="icon">
          {" "}
          <img src={iconUrl} />{" "}
        </li>
      </ul>
    </div>
  );
}
