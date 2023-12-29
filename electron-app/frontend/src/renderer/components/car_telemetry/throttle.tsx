import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

interface ThrottleProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Throttle: React.FC<ThrottleProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [throttleData, setThrottleData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-telemetry/throttle')
      .then(response => response.json())
      .then(data => {
        setThrottleData(data.reverse());
      })
      .catch(error => console.error('Error fetching throttle data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 seconds
    return () => clearInterval(interval);
  }, []);

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
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={throttleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis dataKey="throttle"/>
          <Tooltip />
          <Line type="monotone" dataKey="throttle" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Throttle;
