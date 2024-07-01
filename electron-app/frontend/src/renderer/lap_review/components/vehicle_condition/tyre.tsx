import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

// Images
import Soft from '../../../../../../assets/tyre_compounds/soft.png';
import Medium from '../../../../../../assets/tyre_compounds/medium.png';
import Hard from '../../../../../../assets/tyre_compounds/hard.png';
import Intermediate from '../../../../../../assets/tyre_compounds/intermediate.png';
import Wet from '../../../../../../assets/tyre_compounds/wet.png';

const tyreImages = {
  16: Soft,
  17: Medium,
  18: Hard,
  7: Intermediate,
  8: Wet
};

const compoundMapping: { [key: number]: number } = {
  16: 5,
  17: 4,
  18: 3,
  19: 2,
  20: 1,
  21: 0,
  7: 6,
  8: 7,
};

interface TyresProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Tyres: React.FC<TyresProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [actualTyreCompound, setActualTyreCompound] = useState<number | null>(null);
  const [tyreVisualCompound, setTyreVisualCompound] = useState<number | null>(null);
  const statusData = useCarStatusData();

  useEffect(() => {
    if (statusData) {
      setActualTyreCompound(statusData.actualTyreCompound);
      setTyreVisualCompound(statusData.tyreVisualCompound);
    }
  }, [statusData]);

  const tyreCompoundNames = [" C0 ", " C1 ", " C2 ", " C3 ", " C4 ", " C5 ", " I ", " W "];
  const highlightIndex = compoundMapping[actualTyreCompound ?? -1];

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Tyres</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {tyreVisualCompound !== null && (
          <img src={tyreImages[tyreVisualCompound as keyof typeof tyreImages]} alt="Tyre" style={{ maxWidth: '100%' }} />
        )}
        <div className='car-setup-number'>
          {tyreCompoundNames.map((compound, index) => (
            <span
              key={compound}
              style={{
                color: index === highlightIndex ? 'blue' : (highlightIndex === undefined ? 'defaultColor' : 'grey'),
                marginRight: '5px',
              }}
            >
              {compound}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tyres;
