import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface DistanceProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Distance: React.FC<DistanceProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [distanceData, setDistanceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lap/distance');
        const data = await response.json();
        setDistanceData([data.lapdistance, data.totaldistance]);
      } catch (error) {
        console.error('Error fetching distance data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Distance</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Current Lap Distance: {distanceData[0]}m</p>
      </div>
      <div className="flex-container">
        <p>Total Distance: {distanceData[1]}m</p>
      </div>
    </div>
  );
};

export default Distance;

