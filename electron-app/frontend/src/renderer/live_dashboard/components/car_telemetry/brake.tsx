import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData } from '../../websocket';

interface BrakeProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface BrakeDataPoint {
  brake: number;
  frame: number;
}

const Brake: React.FC<BrakeProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [brakeData, setBrakeData] = useState<BrakeDataPoint[]>([]);
  const carTelemetryData = useCarTelemetryData();

  useEffect(() => {
    if (carTelemetryData) {
      const newSpeedDataPoint = { brake: carTelemetryData.brake, frame: carTelemetryData.frame };
      setBrakeData((prevSpeedData) => [...prevSpeedData, newSpeedDataPoint]);
    }
  }, [carTelemetryData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Brake</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={brakeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="brake"/>
          <Tooltip />
          <Line type="monotone" dataKey="brake" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Brake;
