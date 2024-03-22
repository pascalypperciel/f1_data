import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

interface ClutchProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Clutch: React.FC<ClutchProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [clucthData, setClutchData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-telemetry/clutch')
      .then(response => response.json())
      .then(data => {
        setClutchData(data.reverse());
      })
      .catch(error => console.error('Error fetching clutch data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 seconds
    return () => clearInterval(interval);
  }, []);

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
        <LineChart data={clucthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis dataKey="clutch"/>
          <Tooltip />
          <Line type="monotone" dataKey="clutch" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Clutch;
