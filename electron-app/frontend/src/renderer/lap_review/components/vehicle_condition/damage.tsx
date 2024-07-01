import React, { useEffect, useState } from 'react';
import image from '../../../../../../assets/f1-car-side.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

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
  const statusData = useCarStatusData();

  useEffect(() => {
    if (statusData) {
      const newTemperatureData = {
          tyreDamage: statusData.tyresDamage,
          wingDamage: [statusData.frontLeftWingDamage, statusData.frontRightWingDamage, statusData.rearWingDamage],
          engineDamage: statusData.engineDamage,
          gearBoxDamage: statusData.gearBoxDamage,
         };
         setStats(newTemperatureData);
    }
  }, [statusData]);

  const getDamageColor = (damage: number): string => {
    if (damage < 40) {
      return `rgb(0, ${255 - ((damage) / 40) * 255}, 0)`;
    } else {
      return `rgb(${((damage) / 100) * 255}, 0, 0)`;
    }

  };

  const renderDamageBox = (damage: number, leftPercent: number, topPercent: number, key: string) => (
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%`, color: getDamageColor(damage) }}>
      <strong style={{
          fontWeight: '900',
          fontSize: '1.5em'
        }}>
      {damage} %
    </strong>
    </div>
  );

  const renderDamageTextBox = (textType: string, damage: number, leftPercent: number, topPercent: number, key: string) => (
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%` }}>
      {textType}: <strong style={{ color: getDamageColor(damage), fontWeight: '900', fontSize: '1em' }}>{damage}%</strong>
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
    <img src={image} alt="F1 Car" style={{ width: '100%', height: 'auto', marginTop: '10%', marginBottom: '10%', filter: 'invert(50%)' }} />

      {stats.tyreDamage.map((damage, index) =>
        renderDamageBox(damage, 12 + 61 * tyreOffsetY[index], 22 + 48 * tyreOffsetX[index], `brake-damage-${index}`))}
      {stats.wingDamage.map((damage, index) =>
        renderDamageBox(damage, 4 + 84 * wingOffsetY[index], 11 + 70 * wingOffsetX[index], `wing-damage-${index}`))}
      {renderDamageTextBox("Engine", stats.engineDamage, 31, 46, "engine-damage")}
      {renderDamageTextBox("Gear Box", stats.engineDamage, 31, 50, "gear-box-damage")}
    </div>
  </div>
);


};

export default Damage;
