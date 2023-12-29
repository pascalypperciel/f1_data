import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface PitStatusProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const PitStatus: React.FC<PitStatusProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [pitStatusModeData, setPitStatusModeData] = useState<number | null>(null);

  const pitStatusModeMapping: { [key: number]: string } = {
    0: 'None',
    1: 'Pitting',
    2: 'In Pit Area'
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMode = await fetch('http://localhost:3001/api/lap/pit-status');
        const dataMode = await resMode.json();
        setPitStatusModeData(dataMode.pitstatus);
      } catch (error) {
        console.error('Error fetching pit status data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPitStatusModeWord = (mode: number) => pitStatusModeMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Pit Status</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>{pitStatusModeData !== null ? getPitStatusModeWord(pitStatusModeData) : 'N/A'}</p>
      </div>
    </div>
  );
};

export default PitStatus;
