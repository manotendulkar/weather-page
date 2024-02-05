import { useEffect, useState } from "react";
import gif from "../assets/weatherGIF.mp4";

const GetWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [inputData, setInputData] = useState("Chennai");

  const url = `https://api.weatherbit.io/v2.0/current?&city=${inputData}&key=c0dfefdb99ba42a0addc17d0ff20e8a9&include=minutely`;

  useEffect(() => {
    fetchRecord();
  }, []);
  const fetchRecord = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setWeatherData(result.data[0]);
      console.log(result.data[0]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setInputData(event.target.value);
  };

  return (
    <div className="weather">
      <h1>Get Weather!</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Search by place"
          value={inputData}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={fetchRecord}>
          Go
        </button>
      </div>

      <div>
        {weatherData ? (
          <>
            <div className="video-poistion">
              <video
                src={gif}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              ></video>

              <div className="text-poistion">
                <div className="first-line">
                  <h2>
                    Weather
                    <br /> Forecast
                  </h2>
                  <p>{weatherData.datetime} UTC</p>
                </div>
                <div className="second-line">
                  <h2>{weatherData.city_name}</h2>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`}
                    alt="Weather Icon"
                    className="image"
                  />
                  <h2>{weatherData.temp}° C</h2>
                  <h3>{weatherData.weather.description}</h3>
                </div>
                <div className="third-line">
                  <div>
                    <p>Visibility: {weatherData.vis} km/h</p>
                    <p>Pressure: {weatherData.pres} mb</p>
                    <p>Snowfall: {weatherData.snow} mm/hr</p>
                  </div>
                  <div>
                    <p>Sunrise: {weatherData.sunrise} UTC</p>
                    <p>Sunset: {weatherData.sunset} UTC</p>
                    <p>AQi: {weatherData.aqi}</p>
                  </div>
                  <div>
                    <p>Precipitation: {weatherData.precip}</p>
                    <p>UV: {weatherData.uv.toFixed(2)}</p>
                    <p>Humidity: {weatherData.rh}%</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default GetWeather;
