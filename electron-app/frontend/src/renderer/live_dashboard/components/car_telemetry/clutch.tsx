import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarTelemetryData } from '../../websocket';

interface ClutchProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface ClutchDataPoint {
  clutch: number;
  frame: number;
}

const Clutch: React.FC<ClutchProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [clutchData, setClutchData] = useState<ClutchDataPoint[]>([]);
  const carTelemetryData = useCarTelemetryData();

  useEffect(() => {
    if (carTelemetryData) {
      const newClutchDataPoint = { clutch: carTelemetryData.clutch, frame: carTelemetryData.frame };
      setClutchData((prevClutchData) => [...prevClutchData, newClutchDataPoint]);
    }
  }, [carTelemetryData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Clutch</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={clutchData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="clutch"/>
          <Tooltip />
          <Line type="monotone" dataKey="clutch" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Clutch;
