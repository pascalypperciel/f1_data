import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface WeatherProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Weather: React.FC<WeatherProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [weatherData, setWeatherData] = useState(null);

  const weatherMapping: { [key: number]: string } = {
    0: 'Clear',
    1: 'Light Cloud',
    2: 'Overcast',
    3: 'Light Rain',
    4: 'Heavy Rain',
    5: 'Storm'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/session/weather');
        const data = await response.json();
        setWeatherData(data.weather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherWord = (mode: number) => weatherMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Weather</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
      <p>{weatherData !== null ? getWeatherWord(weatherData) : 'N/A'}</p>
      </div>
    </div>
  );
};

export default Weather;

