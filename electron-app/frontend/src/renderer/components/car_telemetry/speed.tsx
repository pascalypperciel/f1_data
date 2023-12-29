import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

interface SpeedProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Speed: React.FC<SpeedProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [speedData, setSpeedData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-telemetry/speed')
      .then(response => response.json())
      .then(data => {
        setSpeedData(data.reverse());
      })
      .catch(error => console.error('Error fetching speed data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 500); // Fetch data every 0.5 seconds
    return () => clearInterval(interval);
  }, []);

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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis dataKey="speed"/>
          <Tooltip />
          <Line type="monotone" dataKey="speed" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Speed;
