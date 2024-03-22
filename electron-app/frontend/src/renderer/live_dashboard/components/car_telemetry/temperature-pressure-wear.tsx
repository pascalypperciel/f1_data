import React, { useEffect, useState } from 'react';
import image from '../../../../../../assets/f1-car-side.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

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
  const [stats, setStats] = useState({
    brakeTemps: [0, 0, 0, 0],
    tyreSurfaceTemps: [0, 0, 0, 0],
    tyreInnerTemps: [0, 0, 0, 0],
    tyrePressures: [0, 0, 0, 0],
    engineTemp: 0,
    tyreWear: [0, 0, 0, 0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/car-telemetry/temperature-pressure-wear');
        const data = await response.json();
        setStats({
          brakeTemps: [
            data.flbraketemp,
            data.frbraketemp,
            data.rlbraketemp,
            data.rrbraketemp
          ],
          tyreSurfaceTemps: [
            data.fltyresurfacetemp,
            data.frtyresurfacetemp,
            data.rltyresurfacetemp,
            data.rrtyresurfacetemp
          ],
          tyreInnerTemps: [
            data.fltyreinnertemp,
            data.frtyreinnertemp,
            data.rltyreinnertemp,
            data.rrtyreinnertemp
          ],
          tyrePressures: [
            data.fltyrepressure,
            data.frtyrepressure,
            data.rltyrepressure,
            data.rrtyrepressure
          ],
          engineTemp: data.enginetemp,
          tyreWear: [
            data.fltyrewear,
            data.frtyrewear,
            data.rltyrewear,
            data.rrtyrewear
          ]
        });
      } catch (error) {
        console.error('Error fetching temperature, pressure, wear data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 second
    return () => clearInterval(interval);
  }, []);

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
    <div key={key} style={{ position: 'absolute', left: `${leftPercent}%`, top: `${topPercent}%` }}>
      <strong>{wear} %</strong>
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

      {stats.brakeTemps.map((temp, index) =>
        renderTempBox("Brake", temp, 8 + 61 * arrayOffsetY[index], 2 + 83 * arrayOffsetX[index], `brake-temp-${index}`))}
      {stats.tyreSurfaceTemps.map((temp, index) =>
        renderTempBox("Surface", temp, 8 + 61 * arrayOffsetY[index], 6 + 83 * arrayOffsetX[index], `surface-temp-${index}`))}
      {stats.tyreInnerTemps.map((temp, index) =>
        renderTempBox("Inner", temp, 8 + 61 * arrayOffsetY[index], 10 + 83 * arrayOffsetX[index], `inner-temp-${index}`))}
      {stats.tyrePressures.map((pressure, index) =>
        renderPressureBox(pressure, 8 + 60 * arrayOffsetY[index], 22 + 48 * arrayOffsetX[index], `pressure-${index}`))}
      {renderTempBox("Engine", stats.engineTemp, 31, 48, "engine-temp")}
      {stats.tyreWear.map((wear, index) =>
        renderWearBox(wear, 11+ 62 * arrayOffsetY[index], 26 + 48 * arrayOffsetX[index], `wear-${index}`))}
    </div>
  </div>
);


};

export default TempsPressureWear;
