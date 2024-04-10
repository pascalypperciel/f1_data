import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface DistanceProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Distance: React.FC<DistanceProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [distanceData, setDistanceData] = useState<number[]>([]);
  const lapData = useLapData();

  useEffect(() => {
    if (lapData) {
      setDistanceData([ lapData.lapDistance, lapData.totalDistance ]);
    }
  }, [lapData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Distance</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div className='text-over-graph'>Current Lap Distance</div>
          <div className='number-over-graph'>{typeof distanceData[0] === 'number' ? distanceData[0].toFixed(2) : 'N/A'}m</div>
        </div>
        <div>
          <div className='text-over-graph'>Total Distance</div>
          <div className='number-over-graph'>{typeof distanceData[1] === 'number' ? distanceData[1].toFixed(2) : 'N/A'}m</div>
        </div>
      </div>
    </div>
  );
};

export default Distance;

