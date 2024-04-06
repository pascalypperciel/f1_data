import React, { useEffect, useState, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData } from '../../websocket';

interface SpeedProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface SpeedDataPoint {
  speed: number;
  frame: number;
}

const Speed: React.FC<SpeedProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [speedData, setSpeedData] = useState<SpeedDataPoint[]>([]);
  const carTelemetryData = useCarTelemetryData();

  useEffect(() => {
    if (carTelemetryData) {
      const newSpeedDataPoint = { speed: carTelemetryData.speed, frame: carTelemetryData.frame };
      setSpeedData((prevSpeedData) => [...prevSpeedData, newSpeedDataPoint]);
    }
  }, [carTelemetryData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Speed</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={speedData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="speed"/>
          <Tooltip />
          <Line type="monotone" dataKey="speed" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Speed;
