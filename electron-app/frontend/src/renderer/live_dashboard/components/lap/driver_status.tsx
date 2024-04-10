import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface DriverStatusProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const DriverStatus: React.FC<DriverStatusProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [driverStatusModeData, setDriverStatusModeData] = useState<number | null>(null);
  const lapData = useLapData();

  const driverStatusModeMapping: { [key: number]: string } = {
    0: 'In Garage',
    1: 'Flying Lap',
    2: 'In Lap',
    3: 'Out Lap',
    4: 'On Track'
  };

  useEffect(() => {
    if (lapData) {
      setDriverStatusModeData(lapData.driverStatus);
    }
  }, [lapData]);

  const getDriverStatusModeWord = (mode: number) => driverStatusModeMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Driver Status</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div className='text-over-graph'>Driver Status</div>
          <div className='number-over-graph'>{driverStatusModeData !== null ? getDriverStatusModeWord(driverStatusModeData) : 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

export default DriverStatus;
