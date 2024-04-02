import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheck, faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData, useCarStatusData } from '../../websocket';
import "../components.css";
import "./drs.css";

interface DRSProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const DRS: React.FC<DRSProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [drsEnabled, setDrsEnabled] = useState<number>();
  const [drsAllowed, setDrsAllowed] = useState<number>();
  const drsEnabledData = useCarTelemetryData();
  const drsAllowedData = useCarStatusData();

  const drsEnabledIcon = () => (
    <FontAwesomeIcon icon={faCar} style={{ color: drsEnabled ? 'green' : 'red' }} />
  );

  const drsAllowedIcon = () => (
    <FontAwesomeIcon icon={faCheck} style={{ color: drsAllowed ? 'green' : 'red' }} />
  );

  useEffect(() => {
    if (drsEnabledData) {
      const newDRSData = drsEnabledData.drs;
      setDrsEnabled(newDRSData);
    }
  }, [drsEnabledData]);

  useEffect(() => {
    if (drsAllowedData) {
      const newDRSData = drsAllowedData.drsAllowed;
      setDrsAllowed(newDRSData);
    }
  }, [drsAllowedData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>DRS</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>DRS Allowed: {drsAllowed === 1 ? 'Yes' : 'No'}</p>
        {drsAllowedIcon()}
      </div>
      <div className="flex-container">
        <p>DRS Enabled: {drsEnabled === 1 ? 'Yes' : 'No'}</p>
        {drsEnabledIcon()}
      </div>
    </div>
  );


};

export default DRS;
