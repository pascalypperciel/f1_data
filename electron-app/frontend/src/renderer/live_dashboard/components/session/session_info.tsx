import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface SessionInfoProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const SessionInfo: React.FC<SessionInfoProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [sessionInfoData, setSessionInfoData] = useState<any[]>([]);

  const TypeMapping: { [key: number]: string } = {
    0: 'Unknown',
    1: 'P1',
    2: 'P2',
    3: 'P3',
    4: 'Short P',
    5: 'Q1',
    6: 'Q2',
    7: 'Q3',
    8: 'Short Q',
    9: 'OSQ',
    10: 'R',
    11: 'R2',
    12: 'Time Trial'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/session/session-info');
        const data = await response.json();
        setSessionInfoData([data.sessiontype, data.sessionduration, data.sessiontimeleft]);
      } catch (error) {
        console.error('Error fetching session info data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);


  const getTypeWord = (mode: number) => TypeMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Session Info</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Type: {sessionInfoData[0] !== null ? getTypeWord(sessionInfoData[0]) : 'N/A'}</p>
      </div>
      <div className="flex-container">
        <p>Duration: {sessionInfoData[1]} seconds</p>
      </div>
      <div className="flex-container">
        <p>Time Left: {sessionInfoData[2]} seconds</p>
      </div>
    </div>
  );
};

export default SessionInfo;

