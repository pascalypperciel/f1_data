import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface StartingPositionProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const StartingPosition: React.FC<StartingPositionProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [startingPositionData, setStartingPositionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lap/starting-position');
        const data = await response.json();
        setStartingPositionData(data.gridposition);
      } catch (error) {
        console.error('Error fetching starting position data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Grid Position</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>{startingPositionData}</p>
      </div>
    </div>
  );
};

export default StartingPosition;

