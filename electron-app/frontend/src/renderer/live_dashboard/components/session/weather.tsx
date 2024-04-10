import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useSessionData } from '../../websocket';

import clearIcon from '../../../../../../assets/weather_icons/clear.svg';
import lightcloudIcon from '../../../../../../assets/weather_icons/lightcloud.svg';
import overcastIcon from '../../../../../../assets/weather_icons/overcast.svg';
import lightrainIcon from '../../../../../../assets/weather_icons/lightrain.svg';
import heavyrainIcon from '../../../../../../assets/weather_icons/heavyrain.svg';
import stormIcon from '../../../../../../assets/weather_icons/storm.svg';
const weatherIconsMapping: { [key: number]: string } = {
  0: clearIcon,
  1: lightcloudIcon,
  2: overcastIcon ,
  3: lightrainIcon,
  4: heavyrainIcon,
  5: stormIcon
};

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
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className='number-over-graph'>{weatherData !== null ? getWeatherWord(weatherData) : 'N/A'}</div>
        <div>
          {weatherData !== null ? (
            <img
              src={weatherIconsMapping[weatherData]}
              alt="Weather"
              style={{ marginTop: '-20px', filter: 'invert(50%)'}}
            />
          ) : (
            <div className='number-over-graph'>No Weather Data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;

