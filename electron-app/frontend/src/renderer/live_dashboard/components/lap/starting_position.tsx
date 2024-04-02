import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface StartingPositionProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const StartingPosition: React.FC<StartingPositionProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [startingPositionData, setStartingPositionData] = useState<number | null>(null);
  const lapData = useLapData();

  useEffect(() => {
    if (lapData) {
      setStartingPositionData(lapData.gridPosition);
    }
  }, [lapData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Grid Position</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>{startingPositionData}</p>
      </div>
    </div>
  );
};

export default StartingPosition;

