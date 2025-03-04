import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_KEY = 'a69742c8357f09da96821242e1c9e06d'; // Use your active API key
        const LAT = 34.0522; // Latitude for Los Angeles
        const LON = -118.2437; // Longitude for Los Angeles

        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude=minutely&appid=${API_KEY}&units=metric`;
        console.log('Fetching weather data from:', url);

        const response = await axios.get(url);
        setWeather(response.data);
      } catch (err) {
        console.error('Error fetching weather data:', err.response?.data || err.message);
        setError('Failed to fetch weather data. Please check your API key.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>{error}</p>;

  const { current, daily } = weather;

  return (
    <div className="weather-widget">
      <h3>Weather in Los Angeles</h3>
      <div className="weather-current">
        <p>
          <strong>Current Temperature:</strong> {current.temp}°C
        </p>
        <p>
          <strong>Condition:</strong> {current.weather[0].description}
        </p>
      </div>
      <div className="weather-forecast">
        <h4>7-Day Forecast</h4>
        <div className="forecast-row">
          {daily.slice(0, 7).map((day, index) => (
            <div key={index} className="forecast-day">
              <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>
                High: {day.temp.max}°C
                <br />
                Low: {day.temp.min}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
