import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData } from '../../websocket';

interface SteeringProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface SteeringDataPoint {
  steering: number;
  frame: number;
}

const Steering: React.FC<SteeringProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [steeringData, setSteeringData] = useState<SteeringDataPoint[]>([]);
  const carTelemetryData = useCarTelemetryData();

  useEffect(() => {
    if (carTelemetryData) {
      const newSteeringDataPoint = { steering: carTelemetryData.steer, frame: carTelemetryData.frame };
      setSteeringData((prevSteeringData) => [...prevSteeringData, newSteeringDataPoint]);
    }
  }, [carTelemetryData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Steering</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div>
        <div className='text-over-graph'>Steering Direction</div>
        <div className='number-over-graph'> {steeringData.length > 0 ? steeringData[steeringData.length - 1].steering.toFixed(2) : 'N/A'}</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={steeringData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="steering"/>
          <Tooltip />
          <Line type="monotone" dataKey="steering" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Steering;
