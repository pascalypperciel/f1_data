import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface DriverStatusProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const DriverStatus: React.FC<DriverStatusProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [driverStatusModeData, setDriverStatusModeData] = useState<number | null>(null);

  const driverStatusModeMapping: { [key: number]: string } = {
    0: 'In Garage',
    1: 'Flying Lap',
    2: 'In Lap',
    3: 'Out Lap',
    4: 'On Track'
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMode = await fetch('http://localhost:3001/api/lap/driver-status');
        const dataMode = await resMode.json();
        setDriverStatusModeData(dataMode.driverstatus);
      } catch (error) {
        console.error('Error fetching driver status data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="flex-container">
        <p>{driverStatusModeData !== null ? getDriverStatusModeWord(driverStatusModeData) : 'N/A'}</p>
      </div>
    </div>
  );
};

export default DriverStatus;
