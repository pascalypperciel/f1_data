import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

interface AbsProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface ABSDataPoint {
  abs: number;
  frame: number;
}

const ABS: React.FC<AbsProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [absData, setAbsData] = useState<ABSDataPoint[]>([]);
  const statusData = useCarStatusData();

  useEffect(() => {
    if (statusData) {
      const newSpeedDataPoint = { abs: statusData.antiLockBrakes, frame: statusData.frame };
      setAbsData((prevSpeedData) => [...prevSpeedData, newSpeedDataPoint]);
    }
  }, [statusData]);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Abs</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={absData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="abs"/>
          <Tooltip />
          <Line type="monotone" dataKey="abs" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ABS;
