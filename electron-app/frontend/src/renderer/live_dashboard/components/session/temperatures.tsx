import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface TemperatureProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Temperature: React.FC<TemperatureProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [temperatureData, setTemperatureData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/session/temperature');
        const data = await response.json();
        setTemperatureData([data.tracktemp, data.airtemp]);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Temperature</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Track: {temperatureData[0]}°C</p>
      </div>
      <div className="flex-container">
        <p>Air: {temperatureData[1]}°C</p>
      </div>
    </div>
  );
};

export default Temperature;

