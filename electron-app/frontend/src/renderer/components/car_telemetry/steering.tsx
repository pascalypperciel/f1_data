import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

interface SteeringProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Steering: React.FC<SteeringProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [sterringData, setSteeringData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-telemetry/steering')
      .then(response => response.json())
      .then(data => {
        setSteeringData(data.reverse());
      })
      .catch(error => console.error('Error fetching steering data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 seconds
    return () => clearInterval(interval);
  }, []);

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
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sterringData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis dataKey="steering"/>
          <Tooltip />
          <Line type="monotone" dataKey="steering" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Steering;
