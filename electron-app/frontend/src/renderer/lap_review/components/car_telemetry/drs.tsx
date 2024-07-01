import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheck, faHome, faTimes} from '@fortawesome/free-solid-svg-icons';
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
    <FontAwesomeIcon icon={drsAllowed ? faCheck : faTimes} style={{ color: drsAllowed ? 'green' : 'red' }} />
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
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <div>
          <div className='bebas-neue-book'>DRS Allowed</div>
          <div className='bebas-neue-bold'>{drsAllowed === 1 ? 'Yes' : 'No'} {drsAllowedIcon()}</div>
        </div>
        <div>
          <div className='bebas-neue-book'>DRS Enabled</div>
          <div className='bebas-neue-bold'>{drsEnabled === 1 ? 'Yes' : 'No'} {drsEnabledIcon()}</div>
        </div>
      </div>
    </div>
  );


};

export default DRS;
