import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useCarStatusData } from '../../websocket';

interface ERSProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

interface ERSDataPoint {
  ersstoreenergy: number;
  frame: number;
}

const ERS: React.FC<ERSProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [ersModeData, setErsModeData] = useState<number | null>(null);
  const [ersStoreData, setErsStoreData] = useState<ERSDataPoint[]>([]);
  const statusData = useCarStatusData();

  const ersModeMapping: { [key: number]: string } = {
    0: 'None',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Overtake',
    5: 'Hotlap'
  };

  useEffect(() => {
    if (statusData) {
      const newERSStoreDataPoint = { ersstoreenergy: statusData.ersStoreEnergy, frame: statusData.frame };
      setErsStoreData((prevSpeedData) => [...prevSpeedData, newERSStoreDataPoint]);
      setErsModeData(statusData.ersDeployMode)
    }
  }, [statusData]);

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
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis hide dataKey="frame"/>
          <YAxis dataKey="ersstoreenergy"/>
          <Tooltip />
          <Line type="monotone" dataKey="ersstoreenergy" stroke="#8884d8" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ERS;
