import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

interface FlagsProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Flags: React.FC<FlagsProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [flagsData, setFlagsData] = useState<number | null>(null);
  const statusData = useCarStatusData();

  const flagsMapping: { [key: number]: { name: string; color: string } } = {
    0: { name: "None", color: "white" },
    1: { name: "Green", color: "green" },
    2: { name: "Blue", color: "blue" },
    3: { name: "Yellow", color: "yellow" },
    4: { name: "Red", color: "red" }
  };

  useEffect(() => {
    if (statusData) {
      setFlagsData(statusData.vehicleFiaFlags);
    }
  }, [statusData]);

  const getFlagDetails = () => {
    const flagDetail = flagsMapping[flagsData ?? -1];
    return flagDetail || { name: "Unknown", color: "grey" };
  };

  const { name, color } = getFlagDetails();

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Flag</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div>
        <div className='number-over-graph'>{name} <FontAwesomeIcon icon={faFlag} style={{ color }} /></div>
      </div>
    </div>
  );
};

export default Flags;
