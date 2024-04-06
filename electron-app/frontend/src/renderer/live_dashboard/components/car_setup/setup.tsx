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
      <div style={mainContainerStyle}>
        <div style={columnStyle}>
          <div className="flex-container">
            <p>Front Wing Aero: {setupData[0]}</p>
          </div>
          <div className="flex-container">
            <p>Rear Wing Aero: {setupData[1]}</p>
          </div>
          <div className="flex-container">
            <p>Differential Adjustment On Throttle: {setupData[2]}%</p>
          </div>
          <div className="flex-container">
            <p>Differential Adjustment Off Throttle: {setupData[3]}%</p>
          </div>
          <div className="flex-container">
            <p>Front Camber Angle: {setupData[4]}°</p>
          </div>
          <div className="flex-container">
            <p>Rear Camber Angle: {setupData[5]}°</p>
          </div>
          <div className="flex-container">
            <p>Front Toe Angle: {typeof setupData[6] === 'number' ? setupData[6].toFixed(2) : 'N/A'}°</p>
          </div>
          <div className="flex-container">
            <p>Rear Toe Angle: {typeof setupData[7] === 'number' ? setupData[7].toFixed(2) : 'N/A'}°</p>
          </div>
          <div className="flex-container">
            <p>Front Suspension: {setupData[8]}</p>
          </div>
          <div className="flex-container">
            <p>Rear Suspension: {setupData[9]}</p>
          </div>
        </div>
        <div style={columnStyle}>
          <div className="flex-container">
            <p>Front Anti-Roll Bar: {setupData[10]}</p>
          </div>
          <div className="flex-container">
            <p>Rear Anti-Roll Bar: {setupData[11]}</p>
          </div>
          <div className="flex-container">
            <p>Front Ride Height: {setupData[12]}</p>
          </div>
          <div className="flex-container">
            <p>Rear Ride Height: {setupData[13]}</p>
          </div>
          <div className="flex-container">
            <p>Break Pressure: {setupData[14]}%</p>
          </div>
          <div className="flex-container">
            <p>Break Bias: {setupData[15]}%</p>
          </div>
          <div className="flex-container">
            <p>Front Tyre Pressure: {setupData[16]} PSI</p>
          </div>
          <div className="flex-container">
            <p>Rear Tyre Pressure: {setupData[17]} PSI</p>
          </div>
          <div className="flex-container">
            <p>Ballast: {setupData[18]}</p>
          </div>
          <div className="flex-container">
            <p>Fuel Load: {setupData[19]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;

