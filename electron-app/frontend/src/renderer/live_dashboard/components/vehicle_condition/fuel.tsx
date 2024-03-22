import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface FuelProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Fuel: React.FC<FuelProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [fuelData, setFuelData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-status/fuel');
        const data = await response.json();
        setFuelData([data.fuelintank, data.fuelcapacity, data.fuelremaininglaps]);
      } catch (error) {
        console.error('Error fetching fuel data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Fuel</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Fuel in Tank: {fuelData[0]} kg</p>
      </div>
      <div className="flex-container">
        <p> Fuel Capacity: {fuelData[1]} kg</p>
      </div>
      <div className="flex-container">
        <p>Laps Remaining: {fuelData[2]}</p>
      </div>
    </div>
  );
};

export default Fuel;

