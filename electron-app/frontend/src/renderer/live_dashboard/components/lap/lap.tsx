import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface LapProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Lap: React.FC<LapProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [lapData, setLapData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lap/lap');
        const data = await response.json();
        setLapData(data.currentlapnum);
      } catch (error) {
        console.error('Error fetching current lap data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Lap</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Current Lap: {lapData}</p>
      </div>
    </div>
  );
};

export default Lap;

