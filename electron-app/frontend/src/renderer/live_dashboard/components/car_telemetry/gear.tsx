import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

interface GearProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Gear: React.FC<GearProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [gearData, setGearData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-telemetry/gear')
      .then(response => response.json())
      .then(data => {
        setGearData(data.reverse());
      })
      .catch(error => console.error('Error fetching gear data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Gear</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={gearData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis dataKey="gear"/>
          <Tooltip />
          <Line type="monotone" dataKey="gear" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Gear;
