import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface PitStatusProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const PitStatus: React.FC<PitStatusProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [pitStatusModeData, setPitStatusModeData] = useState<number | null>(null);
  const lapData = useLapData();

  const pitStatusModeMapping: { [key: number]: string } = {
    0: 'None',
    1: 'Pitting',
    2: 'In Pit Area'
};

useEffect(() => {
  if (lapData) {
    setPitStatusModeData(lapData.pitStatus);
  }
}, [lapData]);

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
