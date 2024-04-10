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
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div>
            <div className='car-setup-text'>Fuel in Tank</div>
            <div className='car-setup-number'>{typeof fuelData[0] === 'number' ? fuelData[0].toFixed(2) : 'N/A'} kg</div>
          </div>
          <div>
            <div className='car-setup-text'>Fuel Capacity</div>
            <div className='car-setup-number'>{typeof fuelData[1] === 'number' ? fuelData[2].toFixed(2) : 'N/A'} kg</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Laps Remaining</div>
            <div className='car-setup-number'>{typeof fuelData[2] === 'number' ? fuelData[2].toFixed(2) : 'N/A'}</div>
          </div>
          <div>
            <div className='car-setup-text'>Fuel Mix</div>
            <div className='car-setup-number'>{getFuelMixString(fuelData[3])}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fuel;

