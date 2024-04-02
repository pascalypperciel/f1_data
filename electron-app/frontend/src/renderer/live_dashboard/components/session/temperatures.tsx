import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useSessionData } from '../../websocket';

interface TemperatureProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Temperature: React.FC<TemperatureProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const sessionData = useSessionData();

  useEffect(() => {
    if (sessionData) {
      setTemperatureData([
        sessionData.trackTemperature,
        sessionData.airTemperature
      ]);
    }
  }, [sessionData]);

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

