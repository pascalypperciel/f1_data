import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface PenaltiesProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Penalties: React.FC<PenaltiesProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [penaltiesData, setPenaltiesData] = useState<number | null>(null);
  const lapData = useLapData();

  useEffect(() => {
    if (lapData) {
      setPenaltiesData(lapData.penalties);
    }
  }, [lapData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Penalties</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Accumulated: {penaltiesData} seconds</p>
      </div>
    </div>
  );
};

export default Penalties;

