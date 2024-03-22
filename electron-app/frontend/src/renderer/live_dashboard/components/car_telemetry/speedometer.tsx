import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

interface SpeedometerProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Speedometer: React.FC<SpeedometerProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [speedometerData, setSpeedometerData] = useState({ speed: 0, enginerpm: 0, revlights: 0 });

  useEffect(() => {
    fetch('http://localhost:3001/api/car-telemetry/speedometer')
      .then(response => response.json())
      .then(data => {
        setSpeedometerData(data);
      })
      .catch(error => console.error('Error fetching speedometer data:', error));
  }, []);

  const getBarColor = (speed: number): string => {
    const threshold = 200;
    const maxSpeed = 355;

    if (speed <= threshold) {
      return 'rgb(27, 171, 9)';
    } else {
      const ratio = (speed - threshold) / (maxSpeed - threshold);
      const red = Math.floor(ratio * 255);
      const green = (255 - red) / 2;
      return `rgb(${red}, ${green}, 0)`;
    }
  };

  const chartData = [{ name: 'Speed', value: speedometerData.speed, fill: getBarColor(speedometerData.speed) }];

  const activeRevLights = Math.floor(speedometerData.revlights / 10);

  const getRevLightColor = (index: number, activeLights: number): string => {
    if (index < activeLights) {
      if (index < 3) return 'green';
      if (index < 7) return 'red';
      return 'blue';
    }
    return 'grey';
  };

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Speedometer</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
          innerRadius="100%"
          outerRadius="60%"
          data={chartData}
          startAngle={240}
          endAngle={-60}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 355]}
            tick={false}
          />
          <RadialBar
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="value"
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div style={{ textAlign: 'center'}}>
        <p>Speed: {speedometerData.speed} km/h</p>
        <p>RPM: {speedometerData.enginerpm}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: getRevLightColor(index, activeRevLights),
              margin: '0 2px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Speedometer;
