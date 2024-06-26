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
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div className='text-over-graph'>Track Temperature</div>
          <div className='number-over-graph'>{typeof temperatureData[0] === 'number' ? temperatureData[0].toFixed(2) : 'N/A'}°C</div>
        </div>
        <div>
          <div className='text-over-graph'>Air  Temperature</div>
          <div className='number-over-graph'>{typeof temperatureData[1] === 'number' ? temperatureData[1].toFixed(2) : 'N/A'}°C</div>
        </div>
      </div>
    </div>
  );
};

export default Temperature;

