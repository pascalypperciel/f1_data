import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface CurrentPositionProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const CurrentPosition: React.FC<CurrentPositionProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [currentPositionData, setCurrentPositionData] = useState<number>();
  const lapData = useLapData();

  useEffect(() => {
    if (lapData) {
      setCurrentPositionData(lapData.carPosition);
    }
  }, [lapData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>CurrentPosition</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Current Position: {currentPositionData}</p>
      </div>
    </div>
  );
};

export default CurrentPosition;

