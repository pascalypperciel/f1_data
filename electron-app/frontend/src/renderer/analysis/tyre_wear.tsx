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
  { value: 0, label: 'Melbourne', imageUrl: australiaTrack, lapAmount: 58 },
  { value: 1, label: 'Paul Ricard', imageUrl: franceTrack, lapAmount: 53 },
  { value: 2, label: 'Shanghai', imageUrl: chinaTrack, lapAmount: 56 },
  { value: 3, label: 'Bahrain', imageUrl: bahrainTrack, lapAmount: 57 },
  { value: 4, label: 'Catalunya', imageUrl: spainTrack, lapAmount: 66 },
  { value: 5, label: 'Monaco', imageUrl: monacoTrack, lapAmount: 78 },
  { value: 6, label: 'Montreal', imageUrl: canadaTrack, lapAmount: 70 },
  { value: 7, label: 'Silverstone', imageUrl: greatbritainTrack, lapAmount: 52 },
  { value: 9, label: 'Hungaroring', imageUrl: hungaryTrack, lapAmount: 70 },
  { value: 10, label: 'Spa', imageUrl: belgiumTrack, lapAmount: 44 },
  { value: 11, label: 'Monza', imageUrl: monzaTrack, lapAmount: 53 },
  { value: 12, label: 'Singapore', imageUrl: singaporeTrack, lapAmount: 62 },
  { value: 13, label: 'Suzuka', imageUrl: japanTrack, lapAmount: 53 },
  { value: 14, label: 'Abu Dhabi', imageUrl: abudhabiTrack, lapAmount: 58 },
  { value: 15, label: 'Texas', imageUrl: usaTrack, lapAmount: 56 },
  { value: 16, label: 'Brazil', imageUrl: brazilTrack, lapAmount: 71 },
  { value: 17, label: 'Austria', imageUrl: austriaTrack, lapAmount: 71 },
  { value: 18, label: 'Sochi', imageUrl: russiaTrack, lapAmount: 53 },
  { value: 19, label: 'Mexico', imageUrl: mexicoTrack, lapAmount: 71 },
  { value: 20, label: 'Baku', imageUrl: azerbaijanTrack, lapAmount: 51 }
];

import clearIcon from '../../../../assets/weather_icons/clear.svg';
import lightcloudIcon from '../../../../assets/weather_icons/lightcloud.svg';
import overcastIcon from '../../../../assets/weather_icons/overcast.svg';
import lightrainIcon from '../../../../assets/weather_icons/lightrain.svg';
import heavyrainIcon from '../../../../assets/weather_icons/heavyrain.svg';
import stormIcon from '../../../../assets/weather_icons/storm.svg';
import { max } from 'lodash';
const weatherIcons = [
  { value: 0, label: 'Clear', imageUrl: clearIcon },
  { value: 1, label: 'LightCloud', imageUrl: lightcloudIcon },
  { value: 2, label: 'Overcast', imageUrl: overcastIcon },
  { value: 3, label: 'LightRain', imageUrl: lightrainIcon },
  { value: 4, label: 'HeavyRain', imageUrl: heavyrainIcon },
  { value: 5, label: 'Storm', imageUrl: stormIcon },
]

interface TyreWear {
  lap: number;
  tyre_wear: number;
  tyre_type: number;
}

interface LapTimeProps {
  darkMode: boolean;
}

const TyreWear: React.FC<LapTimeProps> = ({ darkMode }) => {
  const [track, setTrack] = useState(trackOptions[0].value);
  const [trackImageUrl, setTrackImageUrl] = useState(trackOptions[0].imageUrl);
  const [tyreCompound, setTyreCompound] = useState(16);
  const [lapAmount, setLapAmount] = useState(0);
  const [maxLapAmount, setMaxLapAmount] = useState(trackOptions[0].lapAmount);
  const [resultTyreWear, setResultTyreWear] = useState();
  const [weather, setWeather] = useState(weatherIcons[0].value)
  const [weatherIconUrl, setWeatherIconUrl] = useState(weatherIcons[0].imageUrl);
  const [weatherLabel, setWeatherLabel] = useState(weatherIcons[0].label);
  const [trackTemp, setTrackTemp] = useState(15);
  const [airTemp, setAirTemp] = useState(15);

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

  const handleSimulate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5001/api/simulate-tyre-wear?track=${encodeURIComponent(track)}&tyreCompound=${encodeURIComponent(tyreCompound)}&lapAmount=${encodeURIComponent(lapAmount)}&weather=${encodeURIComponent(weather)}&airTemp=${encodeURIComponent(airTemp)}&trackTemp=${encodeURIComponent(trackTemp)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if(data.tyre_wear) {
        setResultTyreWear(data.tyre_wear);
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
            <div>Laps Used</div>
            <Slider value={lapAmount} onChange={(e, value) => setLapAmount(value as number)} min={1} max={maxLapAmount} />
            <div className="bebas-neue-bold">{lapAmount} Laps</div>

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
                    setMaxLapAmount(selectedTrack.lapAmount)
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
      <div> {resultTyreWear && <div className="bebas-neue-result"> Tyre Wear: {resultTyreWear}</div>}</div>
    </div>
  );
};

export default TyreWear;
