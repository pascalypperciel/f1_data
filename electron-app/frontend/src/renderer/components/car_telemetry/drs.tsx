import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheck, faHome} from '@fortawesome/free-solid-svg-icons';
import "../components.css";
import "./drs.css";

interface DRSProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const DRS: React.FC<DRSProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [drsEnabled, setDrsEnabled] = useState(null);
  const [drsAllowed, setDrsAllowed] = useState(null);

  const drsEnabledIcon = () => (
    <FontAwesomeIcon icon={faCar} style={{ color: drsEnabled ? 'green' : 'red' }} />
  );

  const drsAllowedIcon = () => (
    <FontAwesomeIcon icon={faCheck} style={{ color: drsAllowed ? 'green' : 'red' }} />
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEnabled = await fetch('http://localhost:3001/api/car-telemetry/latest-drs-enabled');
        const dataEnabled = await resEnabled.json();
        setDrsEnabled(dataEnabled.DrsEnabled);

        const resAllowed = await fetch('http://localhost:3001/api/car-telemetry/latest-drs-allowed');
        const dataAllowed = await resAllowed.json();
        setDrsAllowed(dataAllowed.DrsAllowed);
      } catch (error) {
        console.error('Error fetching DRS data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500); // Fetch every 0.5 seconds
    return () => clearInterval(interval);
  }, []);

  // DRS.js
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
