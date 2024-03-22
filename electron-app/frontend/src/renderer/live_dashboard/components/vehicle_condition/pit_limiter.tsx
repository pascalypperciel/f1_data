import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface PitLimiterProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const PitLimiter: React.FC<PitLimiterProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [pitLimiterData, setPitLimiterData] = useState<number | null>(null);

  const pitLimiterMapping: { [key: number]: { name: string; } } = {
    0: { name: "Off"},
    1: { name: "On"}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-status/pitlimiter');
        const data = await response.json();
        setPitLimiterData(data.pitlimiter);
      } catch (error) {
        console.error('Error fetching pitLimiter data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);

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
