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
      <div className="flex-container">
        <p>Last Lap Time: {timesData[0]} seconds</p>
      </div>
      <div className="flex-container">
        <p>Current Lap Time: {timesData[1]} seconds</p>
      </div>
      <div className="flex-container">
        <p>Best Lap Time: {timesData[2]} seconds</p>
      </div>
      <div className="flex-container">
        <p>Sector 1 Time: {timesData[3]} seconds</p>
      </div>
      <div className="flex-container">
        <p>Sector 2 Time: {timesData[4]} seconds</p>
      </div>
    </div>
  );
};

export default Times;

