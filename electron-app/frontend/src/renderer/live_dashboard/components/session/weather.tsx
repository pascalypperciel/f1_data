import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useSessionData } from '../../websocket';

interface WeatherProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Weather: React.FC<WeatherProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [weatherData, setWeatherData] = useState<number | null>(null);
  const sessionData = useSessionData();

  const weatherMapping: { [key: number]: string } = {
    0: 'Clear',
    1: 'Light Cloud',
    2: 'Overcast',
    3: 'Light Rain',
    4: 'Heavy Rain',
    5: 'Storm'
  };

  useEffect(() => {
    if (sessionData) {
      setWeatherData(sessionData.weather);
    }
  }, [sessionData]);

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

