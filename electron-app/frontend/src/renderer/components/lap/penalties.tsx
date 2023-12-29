import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface PenaltiesProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Penalties: React.FC<PenaltiesProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [penaltiesData, setPenaltiesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lap/penalties');
        const data = await response.json();
        setPenaltiesData(data.timepenalties);
      } catch (error) {
        console.error('Error fetching penalties data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Penalties</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Accumulated: {penaltiesData} seconds</p>
      </div>
    </div>
  );
};

export default Penalties;

