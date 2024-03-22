import React, { useEffect, useState } from 'react';
import image from '../../../../../../assets/f1-car-side.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: 'auto'
};


interface DamageProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Damage: React.FC<DamageProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [stats, setStats] = useState({
    tyreDamage: [0, 0, 0, 0],
    wingDamage: [0, 0, 0],
    engineDamage: 0,
    gearBoxDamage: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-status/damage');
        const data = await response.json();
        setStats({
          tyreDamage: [
            data.fltyredamage,
            data.frtyredamage,
            data.rltyredamage,
            data.rrtyredamage
          ],
          wingDamage: [
            data.flwingdamage,
            data.frwingdamage,
            data.rearwingdamage
          ],
          engineDamage: data.enginedamage,
          gearBoxDamage: data.gearboxdamage
        });
      } catch (error) {
        console.error('Error fetching damage data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderDamageBox = (damage: number, leftPercent: number, topPercent: number, key: string) => (
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%` }}>
      <strong>{damage}%</strong>
    </div>
  );

  const renderDamageTextBox = (textType: string, damage: number, leftPercent: number, topPercent: number, key: string) => (
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%` }}>
      {textType}: <strong>{damage}%</strong>
    </div>
  );

  const tyreOffsetX = [0, 1, 0, 1];
  const tyreOffsetY = [1, 1, 0, 0];
  const wingOffsetX = [0, 1, 0.5];
  const wingOffsetY = [1, 1, 0];

return (
  <div>
    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>Damage</span>
      <FontAwesomeIcon
        icon={faHome}
        onClick={onToggleSelected}
        style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
      />
    </h3>
    <div style={containerStyle}>
    <img src={image} alt="F1 Car" style={{ width: '100%', height: 'auto', marginTop: '10%', marginBottom: '10%' }} />

      {stats.tyreDamage.map((damage, index) =>
        renderDamageBox(damage, 12 + 61 * tyreOffsetY[index], 24 + 48 * tyreOffsetX[index], `brake-damage-${index}`))}
      {stats.wingDamage.map((damage, index) =>
        renderDamageBox(damage, 4 + 84 * wingOffsetY[index], 13 + 70 * wingOffsetX[index], `wing-damage-${index}`))}
      {renderDamageTextBox("Engine", stats.engineDamage, 31, 46, "engine-damage")}
      {renderDamageTextBox("Gear Box", stats.engineDamage, 31, 50, "gear-box-damage")}
    </div>
  </div>
);


};

export default Damage;
