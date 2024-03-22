import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faHome } from '@fortawesome/free-solid-svg-icons';

interface FlagsProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Flags: React.FC<FlagsProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [flagsData, setFlagsData] = useState<number | null>(null);

  const flagsMapping: { [key: number]: { name: string; color: string } } = {
    0: { name: "None", color: "white" },
    1: { name: "Green", color: "green" },
    2: { name: "Blue", color: "blue" },
    3: { name: "Yellow", color: "yellow" },
    4: { name: "Red", color: "red" }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-status/flags');
        const data = await response.json();
        setFlagsData(data.vehiclefiaflages);
      } catch (error) {
        console.error('Error fetching flags data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);

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
      <div className="flex-container">
        <p>{name}</p>
        <FontAwesomeIcon icon={faFlag} style={{ color }} />
      </div>
    </div>
  );
};

export default Flags;
