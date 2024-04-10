import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData } from '../../websocket';

interface GearProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface GearDataPoint {
  gear: number;
  frame: number;
}

const Gear: React.FC<GearProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [gearData, setGearData] = useState<GearDataPoint[]>([]);
  const carTelemetryData = useCarTelemetryData();

  useEffect(() => {
    if (carTelemetryData) {
      const newGearDataPoint = { gear: carTelemetryData.gear, frame: carTelemetryData.frame };
      setGearData((prevGearData) => [...prevGearData, newGearDataPoint]);
    }
  }, [carTelemetryData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Gear</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div>
        <div className='text-over-graph'>Gear Selected</div>
        <div className='number-over-graph'> {gearData.length > 0 ? gearData[gearData.length - 1].gear : 'N/A'}</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={gearData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="gear"/>
          <Tooltip />
          <Line type="monotone" dataKey="gear" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gear;
