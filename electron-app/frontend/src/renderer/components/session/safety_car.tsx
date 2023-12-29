import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface SafetyCarProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const SafetyCar: React.FC<SafetyCarProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [safetyCarModeData, setSafetyCarModeData] = useState<number | null>(null);

  const safetyCarMapping: { [key: number]: string } = {
    0: 'No Safety Car',
    1: 'Full Safety Car',
    2: 'Virtual Safety Car'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMode = await fetch('http://localhost:3001/api/session/safety-car');
        const dataMode = await resMode.json();
        setSafetyCarModeData(dataMode.safetycarstatus);
      } catch (error) {
        console.error('Error fetching safety car data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getSafetyCarWord = (mode: number) => safetyCarMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Safety Car</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>{safetyCarModeData !== null ? getSafetyCarWord(safetyCarModeData) : 'N/A'}</p>
      </div>
    </div>
  );
};

export default SafetyCar;
