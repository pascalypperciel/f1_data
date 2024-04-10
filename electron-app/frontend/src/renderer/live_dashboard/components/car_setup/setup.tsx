import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarSetupData } from '../../websocket';

interface SetupProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Setup: React.FC<SetupProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [setupData, setSetupData] = useState<any[]>([]);
  const carSetupData = useCarSetupData();

  useEffect(() => {
    if (carSetupData) {
      const newSetupData = [
        carSetupData.frontWing,
        carSetupData.rearWing,
        carSetupData.onThrottle,
        carSetupData.offThrottle,
        carSetupData.frontCamber,
        carSetupData.rearCamber,
        carSetupData.frontToe,
        carSetupData.rearToe,
        carSetupData.frontSuspension,
        carSetupData.rearSuspension,
        carSetupData.frontAntiRollBar,
        carSetupData.rearAntiRollBar,
        carSetupData.frontSuspensionHeight,
        carSetupData.rearSuspensionHeight,
        carSetupData.brakePressure,
        carSetupData.brakeBias,
        carSetupData.frontTyrePressure,
        carSetupData.rearTyrePressure,
        carSetupData.ballast,
        carSetupData.fuelLoad
       ];
      setSetupData(newSetupData);
    }
  }, [carSetupData]);

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '180px'
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Setup</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div>
            <div className='car-setup-text'>Front Wing Aero</div>
            <div className='car-setup-number'>{setupData[0]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Wing Aero</div>
            <div className='car-setup-number'>{setupData[1]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Differential Adjustment On Throttle</div>
            <div className='car-setup-number'>{setupData[2]}%</div>
          </div>
          <div>
            <div className='car-setup-text'>Differential Adjustment Off Throttle</div>
            <div className='car-setup-number'>{setupData[3]}%</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Camber Angle</div>
            <div className='car-setup-number'>{setupData[4]}°</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Camber Angle</div>
            <div className='car-setup-number'>{setupData[5]}°</div>
          </div>
          <div>
            <div className='car-setup-text'>Front Toe Angle</div>
            <div className='car-setup-number'>{typeof setupData[6] === 'number' ? setupData[6].toFixed(2) : 'N/A'}°</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Toe Angle</div>
            <div className='car-setup-number'>{typeof setupData[7] === 'number' ? setupData[7].toFixed(2) : 'N/A'}°</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Suspension</div>
            <div className='car-setup-number'>{setupData[8]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Suspension</div>
            <div className='car-setup-number'>{setupData[9]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Front Anti-Roll Bar</div>
            <div className='car-setup-number'>{setupData[10]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Anti-Roll Bar</div>
            <div className='car-setup-number'>{setupData[11]}</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Ride Height</div>
            <div className='car-setup-number'>{setupData[12]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Ride Height</div>
            <div className='car-setup-number'>{setupData[13]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Break Pressure</div>
            <div className='car-setup-number'>{setupData[14]}%</div>
          </div>
          <div>
            <div className='car-setup-text'>Break Bias</div>
            <div className='car-setup-number'>{setupData[15]}%</div>
          </div>
        </div>
        <div>
          <div>
            <div className='car-setup-text'>Front Tyre Pressure</div>
            <div className='car-setup-number'>{setupData[16]} PSI</div>
          </div>
          <div>
            <div className='car-setup-text'>Rear Tyre Pressure</div>
            <div className='car-setup-number'>{setupData[17]} PSI</div>
          </div>
          <div>
            <div className='car-setup-text'>Ballast</div>
            <div className='car-setup-number'>{setupData[18]}</div>
          </div>
          <div>
            <div className='car-setup-text'>Fuel Load</div>
            <div className='car-setup-number'>{setupData[19]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;

