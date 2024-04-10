import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface LapProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Lap: React.FC<LapProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [lapData, setLapData] = useState<number | null>(null);
  const lapDataPacket = useLapData();

  useEffect(() => {
    if (lapDataPacket) {
      setLapData(lapDataPacket.currentLapNum);
    }
  }, [lapDataPacket]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Lap</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div className='text-over-graph'>Current Lap</div>
          <div className='number-over-graph'>{lapData}</div>
        </div>
      </div>
    </div>
  );
};

export default Lap;

