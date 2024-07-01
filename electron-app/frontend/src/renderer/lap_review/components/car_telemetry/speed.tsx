import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../components.css";

interface SpeedProps {
  speedDataSets: { speed: number, distance: number }[][];
}

const Speed: React.FC<SpeedProps> = ({ speedDataSets }) => {
  const colors = [
    "#FF0000",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#DAF7A6",
    "#FFC300",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#DAF7A6",
    "#FFC300",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#DAF7A6",
    "#FFC300"
  ];

  const allDataPoints = speedDataSets.flat();
  const maxDistance = Math.max(...allDataPoints.map(d => d.distance));

  return (
    <div>
      <div>
        <div className='text-over-graph'>Speed</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="distance" type="number" domain={[0, maxDistance]}/>
          <YAxis dataKey="speed" type="number"/>
          {speedDataSets.map((speedData, index) => (
            <Line key={index} type="monotone" dataKey="speed" data={speedData} stroke={colors[index % colors.length]} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Speed;
