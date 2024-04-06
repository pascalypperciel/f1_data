import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';
import '../components.css'

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
        <span>Current Position</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <div style={{ display: 'flex', height: '90px' }}> {/* Example height */}
            <div className="bebas-neue-bold">{currentPositionData}</div>
            <div style={{ alignSelf: 'flex-end' }}>/20</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPosition;

