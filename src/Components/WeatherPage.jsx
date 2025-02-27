import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../WeatherPage.css'; // Assuming you're adding styles in an external CSS file

const API_KEY = "794ee95e63c5a32aaf88cd813fa2e425";

const WeatherPage = () => {
  const { capital, country } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching weather:", error);
        setLoading(false);
      });
  }, [capital]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="weather-page">
      <div className="weather-header">
        <h1>Weather in {capital}, {country}</h1>
      </div>

      {weather ? (
        <div className="weather-info">
          <div className="weather-temp">
            <h2>{weather.main.temp}°C</h2>
            <p>{weather.weather[0].description}</p>
          </div>
          <div className="weather-details">
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
          </div>
        </div>
      ) : (
        <p className="error-message">Weather data not available</p>
      )}
    </div>
  );
};

export default WeatherPage;
