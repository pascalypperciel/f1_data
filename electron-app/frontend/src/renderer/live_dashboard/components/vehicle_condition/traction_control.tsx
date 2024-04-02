import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

interface TractionControlProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const TractionControl: React.FC<TractionControlProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [tractionControlData, setTractionControlData] = useState<number | null>(null);
  const statusData = useCarStatusData();

  const tractionControlMapping: { [key: number]: { name: string; } } = {
    0: { name: "Off"},
    2: { name: "High"}
  };

  useEffect(() => {
    if (statusData) {
      setTractionControlData(statusData.tractionControl);
    }
  }, [statusData]);

  const getTractionControlDetails = () => {
    const tractionControlDetail = tractionControlMapping[tractionControlData ?? -1];
    return tractionControlDetail || { name: "Unknown"};
  };

  const { name } = getTractionControlDetails();

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Traction Control</span>
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

export default TractionControl;

