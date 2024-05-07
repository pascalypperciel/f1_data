import React, { useState, useEffect } from 'react';
import { Slider, Select, FormControl, MenuItem, Button, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area, ResponsiveContainer, Legend, ReferenceLine, AreaChart } from 'recharts';
import './analysis.css';

import australiaTrack from '../../../../assets/track_layouts/australia.svg';
import franceTrack from '../../../../assets/track_layouts/france.svg';
import chinaTrack from '../../../../assets/track_layouts/china.svg';
import bahrainTrack from '../../../../assets/track_layouts/bahrain.svg';
import spainTrack from '../../../../assets/track_layouts/spain.svg';
import monacoTrack from '../../../../assets/track_layouts/monaco.svg';
import canadaTrack from '../../../../assets/track_layouts/canada.svg';
import greatbritainTrack from '../../../../assets/track_layouts/greatbritain.svg';
import hungaryTrack from '../../../../assets/track_layouts/hungary.svg';
import belgiumTrack from '../../../../assets/track_layouts/belgium.svg';
import monzaTrack from '../../../../assets/track_layouts/italy.svg';
import singaporeTrack from '../../../../assets/track_layouts/singapore.svg';
import japanTrack from '../../../../assets/track_layouts/japan.svg';
import abudhabiTrack from '../../../../assets/track_layouts/abudhabi.svg';
import usaTrack from '../../../../assets/track_layouts/usa.svg';
import brazilTrack from '../../../../assets/track_layouts/brazil.svg';
import austriaTrack from '../../../../assets/track_layouts/austria.svg';
import russiaTrack from '../../../../assets/track_layouts/russia.svg';
import mexicoTrack from '../../../../assets/track_layouts/mexico.svg';
import azerbaijanTrack from '../../../../assets/track_layouts/azerbaijan.svg';

const tyreCompoundNames: Record<number, string> = {
  16: 'C5',
  17: 'C4',
  18: 'C3',
  19: 'C2',
  20: 'C1',
  21: 'C0',
  7: 'I',
  8: 'W'
};

const sliderToTyreCompound = [7, 8, 16, 17, 18, 19, 20, 21];
const tyreCompoundToSlider = (compound: number) => sliderToTyreCompound.indexOf(compound) + 1;

const trackOptions = [
  { value: 0, label: 'Melbourne', imageUrl: australiaTrack },
  { value: 1, label: 'Paul Ricard', imageUrl: franceTrack },
  { value: 2, label: 'Shanghai', imageUrl: chinaTrack },
  { value: 3, label: 'Bahrain', imageUrl: bahrainTrack },
  { value: 4, label: 'Catalunya', imageUrl: spainTrack },
  { value: 5, label: 'Monaco', imageUrl: monacoTrack },
  { value: 6, label: 'Montreal', imageUrl: canadaTrack },
  { value: 7, label: 'Silverstone', imageUrl: greatbritainTrack },
  { value: 9, label: 'Hungaroring', imageUrl: hungaryTrack },
  { value: 10, label: 'Spa', imageUrl: belgiumTrack },
  { value: 11, label: 'Monza', imageUrl: monzaTrack },
  { value: 12, label: 'Singapore', imageUrl: singaporeTrack },
  { value: 13, label: 'Suzuka', imageUrl: japanTrack },
  { value: 14, label: 'Abu Dhabi', imageUrl: abudhabiTrack },
  { value: 15, label: 'Texas', imageUrl: usaTrack },
  { value: 16, label: 'Brazil', imageUrl: brazilTrack },
  { value: 17, label: 'Austria', imageUrl: austriaTrack },
  { value: 18, label: 'Sochi', imageUrl: russiaTrack },
  { value: 19, label: 'Mexico', imageUrl: mexicoTrack },
  { value: 20, label: 'Baku', imageUrl: azerbaijanTrack }
];

import clearIcon from '../../../../assets/weather_icons/clear.svg';
import lightcloudIcon from '../../../../assets/weather_icons/lightcloud.svg';
import overcastIcon from '../../../../assets/weather_icons/overcast.svg';
import lightrainIcon from '../../../../assets/weather_icons/lightrain.svg';
import heavyrainIcon from '../../../../assets/weather_icons/heavyrain.svg';
import stormIcon from '../../../../assets/weather_icons/storm.svg';
const weatherIcons = [
  { value: 0, label: 'Clear', imageUrl: clearIcon },
  { value: 1, label: 'LightCloud', imageUrl: lightcloudIcon },
  { value: 2, label: 'Overcast', imageUrl: overcastIcon },
  { value: 3, label: 'LightRain', imageUrl: lightrainIcon },
  { value: 4, label: 'HeavyRain', imageUrl: heavyrainIcon },
  { value: 5, label: 'Storm', imageUrl: stormIcon },
]

interface TyreData {
  lap: number;
  tyre_wear: number;
  tyre_type: number;
}

interface LapTimeProps {
  darkMode: boolean;
}

const LapTime: React.FC<LapTimeProps> = ({ darkMode }) => {
  const [track, setTrack] = useState(trackOptions[0].value);
  const [trackImageUrl, setTrackImageUrl] = useState(trackOptions[0].imageUrl);
  const [weather, setWeather] = useState(weatherIcons[0].value)
  const [weatherIconUrl, setWeatherIconUrl] = useState(weatherIcons[0].imageUrl);
  const [weatherLabel, setWeatherLabel] = useState(weatherIcons[0].label);
  const [trackTemp, setTrackTemp] = useState(15);
  const [airTemp, setAirTemp] = useState(15);
  const [fuelInTank, setFuelInTank] = useState(110);
  const [tyreWear, setTyreWear] = useState(0);
  const [tyreCompound, setTyreCompound] = useState(16);

  const handleWeatherChange = (event: Event, value: number | number[]) => {
    const selectedWeather = weatherIcons.find(icon => icon.value === value);
    if (selectedWeather) {
      setWeather(selectedWeather.value);
      setWeatherIconUrl(selectedWeather.imageUrl);
      setWeatherLabel(selectedWeather.label)
    }
  };

  const handleSliderChange = (event: Event, value: number | number[]) => {
    const compound = sliderToTyreCompound[(value as number) - 1];
    setTyreCompound(compound);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [lapTime, setLapTime] = useState<string>()

  function formatTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60));
    const milliseconds = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  const handleSimulate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5001/api/simulate-lap-time?track=${encodeURIComponent(track)}&fuelintank=${encodeURIComponent(fuelInTank)}&weather=${encodeURIComponent(weather)}&trackTemp=${encodeURIComponent(trackTemp)}&airTemp=${encodeURIComponent(airTemp)}&tyreWear=${encodeURIComponent(tyreWear)}&tyreCompound=${encodeURIComponent(tyreCompound)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if(data.lap_time) {
        const formattedLapTime = formatTime(data.lap_time);
        setLapTime(formattedLapTime);
      }
    } catch (error) {
      console.error('Failed to simulate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }} className="slider-blue">
          <div style={{ width: '45%' }}>
            <div>Fuel in Tank</div>
            <Slider value={fuelInTank} onChange={(e, value) => setFuelInTank(value as number)} min={1} max={110} />
            <div className="bebas-neue-bold">{fuelInTank} kg</div>

            <div>Track</div>
            <FormControl fullWidth>
              <Select
                labelId="track-select-label"
                value={track}
                onChange={(event) => {
                  const selectedTrack = trackOptions.find(option => option.value === event.target.value);
                  if (selectedTrack) {
                    setTrack(selectedTrack.value);
                    setTrackImageUrl(selectedTrack.imageUrl);
                  }
                }}
              >
                {trackOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ paddingTop: '10px'}}>
              {trackImageUrl && <img
                src={trackImageUrl}
                alt="Track"
                className="track-image"
                style={{ paddingTop: '10px', alignItems: 'center'}} />}
            </div>

            <div>Tyre Wear</div>
            <div style = {{ display:'flex', alignItems: 'center'}} className="slider-container">
              <Slider value={tyreWear} onChange={(e, value) => setTyreWear(value as number)} min={0} max={100} style={{ flexGrow: 1, margin: '0 20px' }}/>
            </div>
            <div className="bebas-neue-bold">{tyreWear}%</div>
          </div>

          <div style={{ width: '45%' }}>
            <div>Weather</div>
            <Slider
              value={weather}
              onChange={handleWeatherChange}
              min={0}
              max={5}
              step={1}
              valueLabelDisplay="off"
            />
            <img
              src={weatherIconUrl}
              alt="Weather"
              className={`weather-icon ${darkMode ? 'dark-mode' : ''}`}
              style={{ marginTop: '-20px' }} />
            <div className="bebas-neue-title">{weatherLabel}</div>


            <div>Track Temperature</div>
            <div style = {{ display:'flex', alignItems: 'center'}} className="slider-container">
              <FontAwesomeIcon icon={faSnowflake} />
              <Slider value={trackTemp} onChange={(e, value) => setTrackTemp(value as number)} min={15} max={40} style={{ flexGrow: 1, margin: '0 20px' }}/>
              <FontAwesomeIcon icon={faSun} />
            </div>
            <div className="bebas-neue-bold">{trackTemp}°C</div>

            <div>Air Temperature</div>
            <div style = {{ display:'flex', alignItems: 'center'}} className="slider-container">
              <FontAwesomeIcon icon={faSnowflake} />
              <Slider value={airTemp} onChange={(e, value) => setAirTemp(value as number)} min={15} max={40} style={{ flexGrow: 1, margin: '0 20px' }}/>
              <FontAwesomeIcon icon={faSun} />
            </div>
            <div className="bebas-neue-bold">{airTemp}°C</div>

            <div>Tyre Compound</div>
            <div style={{ display: 'flex', alignItems: 'center' }} className="slider-container">
              <Slider
                value={tyreCompoundToSlider(tyreCompound)}
                onChange={handleSliderChange}
                min={1}
                max={8}
                style={{ flexGrow: 1, margin: '0 20px' }}
              />
            </div>
            <div className="bebas-neue-bold">
              {Object.entries(tyreCompoundNames).map(([key, name]) => (
                <span
                  key={key}
                  style={{
                    color: parseInt(key) === tyreCompound ? 'blue' : 'grey',
                    marginRight: '20px',
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSimulate}
          style={{ backgroundColor: 'blue' }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Simulate"}
        </Button>
      </div>
      <div> {lapTime && <div className="bebas-neue-result"> Time: {lapTime}</div>}</div>
    </div>
  );
};

export default LapTime;
