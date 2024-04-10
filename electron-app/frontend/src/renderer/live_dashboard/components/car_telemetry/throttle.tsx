import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData } from '../../websocket';

interface ThrottleProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface ThrottleDataPoint {
  throttle: number;
  frame: number;
}

const Throttle: React.FC<ThrottleProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [throttleData, setThrottleData] = useState<ThrottleDataPoint[]>([]);
  const carTelemetryData = useCarTelemetryData();

  useEffect(() => {
    if (carTelemetryData) {
      const newThrottleDataPoint = { throttle: carTelemetryData.throttle, frame: carTelemetryData.frame };
      setThrottleData((prevThrottleData) => [...prevThrottleData, newThrottleDataPoint]);
    }
  }, [carTelemetryData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Throttle</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div>
        <div className='text-over-graph'>Throttle Pedal Pressure</div>
        <div className='number-over-graph'> {throttleData.length > 0 ? throttleData[throttleData.length - 1].throttle * 100 : 'N/A'}%</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={throttleData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="throttle"/>
          <Tooltip />
          <Line type="monotone" dataKey="throttle" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Throttle;
