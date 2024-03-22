import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface ERSProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const ERS: React.FC<ERSProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [ersModeData, setErsModeData] = useState<number | null>(null);
  const [ersStoreData, setErsStoreData] = useState([]);

  const ersModeMapping: { [key: number]: string } = {
    0: 'None',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Overtake',
    5: 'Hotlap'
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resMode = await fetch('http://localhost:3001/api/car-status/ers-deploy-mode');
        const dataMode = await resMode.json();
        setErsModeData(dataMode.ersdeploymode);
      } catch (error) {
        console.error('Error fetching ERS deploy mode data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500); // Fetch every 0.5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3001/api/car-status/ers-energy-store')
      .then(response => response.json())
      .then(data => {
        setErsStoreData(data.reverse());
      })
      .catch(error => console.error('Error fetching ERS energy store data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // Fetch data every 1 seconds
    return () => clearInterval(interval);
  }, []);


  const getErsModeWord = (mode: number) => ersModeMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>ERS</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Deploy Mode: {ersModeData !== null ? getErsModeWord(ersModeData) : 'N/A'}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ersStoreData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide/>
          <YAxis dataKey="ersstoreenergy"/>
          <Tooltip />
          <Line type="monotone" dataKey="ersstoreenergy" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ERS;
