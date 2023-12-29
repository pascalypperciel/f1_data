import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface CurrentPositionProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const CurrentPosition: React.FC<CurrentPositionProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [currentPositionData, setCurrentPositionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lap/current-position');
        const data = await response.json();
        setCurrentPositionData(data.carposition);
      } catch (error) {
        console.error('Error fetching current position data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>CurrentPosition</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Current Position: {currentPositionData}</p>
      </div>
    </div>
  );
};

export default CurrentPosition;

