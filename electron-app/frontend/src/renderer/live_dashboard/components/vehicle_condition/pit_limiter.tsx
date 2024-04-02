import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

interface PitLimiterProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const PitLimiter: React.FC<PitLimiterProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [pitLimiterData, setPitLimiterData] = useState<number | null>(null);
  const statusData = useCarStatusData();

  const pitLimiterMapping: { [key: number]: { name: string; } } = {
    0: { name: "Off"},
    1: { name: "On"}
  };

  useEffect(() => {
    if (statusData) {
      setPitLimiterData(statusData.pitLimiterStatus);
    }
  }, [statusData]);

  const getPitLimiterDetails = () => {
    const pitLimiterDetail = pitLimiterMapping[pitLimiterData ?? -1];
    return pitLimiterDetail || { name: "Unknown"};
  };

  const { name } = getPitLimiterDetails();

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Pit Limiter</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default PitLimiter;
