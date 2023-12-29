import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Images
import Soft from '../../../../../assets/tyre_compounds/soft.png';
import Medium from '../../../../../assets/tyre_compounds/medium.png';
import Hard from '../../../../../assets/tyre_compounds/hard.png';
import Intermediate from '../../../../../assets/tyre_compounds/intermediate.png';
import Wet from '../../../../../assets/tyre_compounds/wet.png';

const tyreImages = {
  16: Soft,
  17: Medium,
  18: Hard,
  7: Intermediate,
  8: Wet
};

interface TyresProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Tyres: React.FC<TyresProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [actualTyreCompound, setActualTyreCompound] = useState<number | null>(null);
  const [tyreVisualCompound, setTyreVisualCompound] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-status/tyre');
        const data = await response.json();
        setActualTyreCompound(data.actualtyrecompound);
        setTyreVisualCompound(data.tyrevisualcompound);
      } catch (error) {
        console.error('Error fetching tyre data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);

  const tyreCompoundNames = [" C0 ", " C1 ", " C2 ", " C3 ", " C4 ", " C5 "];

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
        <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '1.2em' }}>
          {tyreCompoundNames.map((compound, index) => (
            <span key={compound} style={{ color: actualTyreCompound === index + 16 ? 'blue' : 'black', marginRight: '5px' }}>
              {compound}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tyres;
