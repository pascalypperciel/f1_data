import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SpeedProps {
  speedData: { speed: number, frame: number }[];
}

const Speed: React.FC<SpeedProps> = ({ speedData}) => {
  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Speed</span>
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
