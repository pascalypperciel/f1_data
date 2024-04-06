import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

interface FuelProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Fuel: React.FC<FuelProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [fuelData, setFuelData] = useState<number[]>([]);
  const statusData = useCarStatusData();

  const getFuelMixString = (value: number): string => {
    const fuelMixMap = ['Lean', 'Standard', 'Rich', 'Max'];
    return fuelMixMap[value] || 'unknown';
  };

  useEffect(() => {
    if (statusData) {
      setFuelData([ statusData.fuelInTank, statusData.fuelCapacity, statusData.fuelRemainingLaps, statusData.fuelMix]);
    }
  }, [statusData]);

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
        <p>Fuel Capacity: {fuelData[1]} kg</p>
      </div>
      <div className="flex-container">
        <p>Laps Remaining: {fuelData[2]}</p>
      </div>
      <div className="flex-container">
      <p>Fuel Mix: {getFuelMixString(fuelData[3])}</p>
      </div>
    </div>
  );
};

export default Fuel;

