import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface FrontBrakeBiasProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const FrontBrakeBias: React.FC<FrontBrakeBiasProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [fbbData, setFbbData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-status/front-brake-bias');
        const data = await response.json();
        setFbbData(data.frontbrakebias);
      } catch (error) {
        console.error('Error fetching front brake bias data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Front Brake Bias</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>{fbbData} %</p>
      </div>
    </div>
  );
};

export default FrontBrakeBias;

