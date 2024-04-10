import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

interface FrontBrakeBiasProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const FrontBrakeBias: React.FC<FrontBrakeBiasProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [fbbData, setFbbData] = useState<number | null>(null);
  const statusData = useCarStatusData();

  useEffect(() => {
    if (statusData) {
      setFbbData(statusData.frontBrakeBias);
    }
  }, [statusData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Front Brake Bias</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div>
        <div className='text-over-graph'>Front Brake Bias</div>
        <div className='number-over-graph'>{fbbData} %</div>
      </div>
    </div>
  );
};

export default FrontBrakeBias;

