import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface BrakeProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Brake: React.FC<BrakeProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [brakeData, setBrakeData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-telemetry/brake')
      .then(response => response.json())
      .then(data => {
        setBrakeData(data.reverse());
      })
      .catch(error => console.error('Error fetching brake data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 seconds
    return () => clearInterval(interval);
  }, []);

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
          <XAxis hide/>
          <YAxis dataKey="brake"/>
          <Tooltip />
          <Line type="monotone" dataKey="brake" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Brake;
