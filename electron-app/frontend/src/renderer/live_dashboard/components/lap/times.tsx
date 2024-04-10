import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface TimesProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Times: React.FC<TimesProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [timesData, setTimesData] = useState<number[]>([]);
  const lapData = useLapData();

  useEffect(() => {
    if (lapData) {
      setTimesData([
        lapData.lastLapTime,
        lapData.currentLapTime,
        lapData.bestLapTime,
        lapData.sector1Time,
        lapData.sector2Time
      ]);
    }
  }, [lapData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Times</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div>
            <div className='car-setup-text'>Last Lap Time</div>
            <div className='car-setup-number'>{typeof timesData[0] === 'number' ? timesData[0].toFixed(2) : 'N/A'} seconds</div>
          </div>
          <div>
            <div className='car-setup-text'>Current Lap Time</div>
            <div className='car-setup-number'>{typeof timesData[1] === 'number' ? timesData[1].toFixed(2) : 'N/A'} seconds</div>
          </div>
          <div>
            <div className='car-setup-text'>Best Lap Time</div>
            <div className='car-setup-number'>{typeof timesData[2] === 'number' ? timesData[2].toFixed(2) : 'N/A'} seconds</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Sector 1 Time</div>
            <div className='car-setup-number'>{typeof timesData[3] === 'number' ? timesData[3].toFixed(2) : 'N/A'} seconds</div>
          </div>
          <div>
            <div className='car-setup-text'>Sector 2 Time</div>
            <div className='car-setup-number'>{typeof timesData[4] === 'number' ? timesData[4].toFixed(2) : 'N/A'} seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Times;

