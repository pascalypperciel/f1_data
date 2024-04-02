import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLapData } from '../../websocket';

interface SectorProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Sector: React.FC<SectorProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [sectorModeData, setSectorModeData] = useState<number | null>(null);
  const lapData = useLapData();

  const sectorMapping: { [key: number]: string } = {
    0: 'Sector 1',
    1: 'Sector 2',
    2: 'Sector 3'
  };

  useEffect(() => {
    if (lapData) {
      setSectorModeData(lapData.sector);
    }
  }, [lapData]);

  const getSectorWord = (mode: number) => sectorMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Sector</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>{sectorModeData !== null ? getSectorWord(sectorModeData) : 'N/A'}</p>
      </div>
    </div>
  );
};

export default Sector;
