import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';

interface AbsProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const ABS: React.FC<AbsProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [absData, setAbsData] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-status/abs')
      .then(response => response.json())
      .then(data => {
        setAbsData(data.reverse());
      })
      .catch(error => console.error('Error fetching abs data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 seconds
    return () => clearInterval(interval);
  }, []);

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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis dataKey="abs"/>
          <Tooltip />
          <Line type="monotone" dataKey="abs" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ABS;
