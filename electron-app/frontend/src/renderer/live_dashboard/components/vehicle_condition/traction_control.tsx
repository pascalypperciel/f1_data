import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface TractionControlProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const TractionControl: React.FC<TractionControlProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [tractionControlData, setTractionControlData] = useState<number | null>(null);

  const tractionControlMapping: { [key: number]: { name: string; } } = {
    0: { name: "Off"},
    2: { name: "High"}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-status/tractioncontrol');
        const data = await response.json();
        setTractionControlData(data.tractioncontrol);
      } catch (error) {
        console.error('Error fetching traction control data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);

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

