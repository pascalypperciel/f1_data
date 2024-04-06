import React, { useEffect, useState } from 'react';
import image from '../../../../../../assets/f1-car-side.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData, useCarStatusData } from '../../websocket';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: 'auto'
};

interface TempsPressureWearProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const TempsPressureWear: React.FC<TempsPressureWearProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [temperatures, setTemperatures] = useState({
    brakeTemps: [0, 0, 0, 0],
    tyreSurfaceTemps: [0, 0, 0, 0],
    tyreInnerTemps: [0, 0, 0, 0],
    tyrePressures: [0, 0, 0, 0],
    engineTemp: 0,
  });
  const [tyreWear, setTyreWear] = useState({
    tyreWear: [0, 0, 0, 0]
  });
  const carTelemetryData = useCarTelemetryData();
  const carStatusData = useCarStatusData();

  useEffect(() => {
    if (carTelemetryData) {
      const newTemperatureData = {
         brakeTemps: carTelemetryData.brakesTemperature,
         tyreSurfaceTemps: carTelemetryData.tyresSurfaceTemperature,
         tyreInnerTemps: carTelemetryData.tyresInnerTemperature,
         tyrePressures: carTelemetryData.tyresPressure,
         engineTemp: carTelemetryData.engineTemperature,
         };
         setTemperatures(newTemperatureData);
    }
  }, [carTelemetryData]);

  useEffect(() => {
    if (carStatusData) {
      const newWearData = { tyreWear:carStatusData.tyresWear };
      setTyreWear(newWearData);
    }
  }, [carStatusData]);

  const getWearColor = (wear: number): string => {
    if (wear < 20) {
      return `rgb(${255 * (wear / 20)}, 255, 0)`; // Green to yellow
    } else if (wear < 40) {
      return `rgb(255, ${255 - ((wear - 20) / 20) * 255}, 0)`; // Yellow to orange
    } else if (wear < 60) {
      return `rgb(255, 0, 0)`; // Red
    } else {
      return `rgb(${139 - ((wear - 60) / 40) * 139}, 0, 0)`; // Dark red
    }
  };

  const renderTempBox = (textType: string, temp: number, leftPercent: number, topPercent: number, key: string) => (
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%` }}>
      {textType}: <strong>{temp ? `${temp}°C` : 'N/A'}</strong>
    </div>
  );

  const renderPressureBox = (pressure: number, leftPercent: number, topPercent: number, key: string) => (
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%` }}>
      <strong>{pressure ? `${pressure} PSI` : 'N/A'}</strong>
    </div>
  );

  const renderWearBox = (wear: number, leftPercent: number, topPercent: number, key: string) => (
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%`, color: getWearColor(wear) }}>
      <strong style={{
          fontWeight: '900',
          fontSize: '2.2em'
        }}>
      {wear} %
    </strong>
    </div>
  );

  const arrayOffsetX = [0, 1, 0, 1];
  const arrayOffsetY = [1, 1, 0, 0];

return (
  <div>
    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>Temperatures, Tyre Wear and Tyre Pressure</span>
      <FontAwesomeIcon
        icon={faHome}
        onClick={onToggleSelected}
        style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
      />
    </h3>
    <div style={containerStyle}>
    <img src={image} alt="F1 Car" style={{ width: '100%', height: 'auto', marginTop: '10%', marginBottom: '10%' }} />
      {temperatures.brakeTemps.map((temp, index) =>
        renderTempBox("Brake", temp, 8 + 61 * arrayOffsetY[index], 2 + 83 * arrayOffsetX[index], `brake-temp-${index}`))}
      {temperatures.tyreSurfaceTemps.map((temp, index) =>
        renderTempBox("Surface", temp, 8 + 61 * arrayOffsetY[index], 6 + 83 * arrayOffsetX[index], `surface-temp-${index}`))}
      {temperatures.tyreInnerTemps.map((temp, index) =>
        renderTempBox("Inner", temp, 8 + 61 * arrayOffsetY[index], 10 + 83 * arrayOffsetX[index], `inner-temp-${index}`))}
      {temperatures.tyrePressures.map((pressure, index) =>
        renderPressureBox(pressure, 8 + 60 * arrayOffsetY[index], 19 + 48 * arrayOffsetX[index], `pressure-${index}`))}
      {renderTempBox("Engine", temperatures.engineTemp, 31, 48, "engine-temp")}
      {tyreWear.tyreWear.map((wear, index) =>
        renderWearBox(wear, 11+ 62 * arrayOffsetY[index], 23 + 48 * arrayOffsetX[index], `wear-${index}`))}
    </div>
  </div>
);


};

export default TempsPressureWear;
