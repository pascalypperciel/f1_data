import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useSessionData } from '../../websocket';

interface TrackProps {
  isSelectedForHome: boolean;
  onToggleSelected: () => void;
}

const Track: React.FC<TrackProps> = ({ isSelectedForHome, onToggleSelected }) => {
  const [trackData, setTrackData] = useState<number[]>([]);
  const sessionData = useSessionData();

  const TrackMapping: { [key: number]: string } = {
    0: 'Melbourne',
    1: 'Paul Ricard',
    2: 'Shanghai',
    3: 'Sakhir (Bahrain)',
    4: 'Catalunya',
    5: 'Monaco',
    6: 'Montreal',
    7: 'Silverstone',
    8: 'Hockenheim',
    9: 'Hungaroring',
    10: 'Spa',
    11: 'Monza',
    12: 'Singapore',
    13: 'Suzuka',
    14: 'Abu Dhabi',
    15: 'Texas',
    16: 'Brazil',
    17: 'Austria',
    18: 'Sochi',
    19: 'Mexico',
    20: 'Baku (Azerbaijan)',
    21: 'Sakhir Short',
    22: 'Silverstone Short',
    23: 'Texas Short',
    24: 'Suzuka Short'
  };

  useEffect(() => {
    if (sessionData) {
      setTrackData([
        sessionData.trackId,
        sessionData.totalLaps,
        sessionData.trackLength
      ]);
    }
  }, [sessionData]);


  const getTrackWord = (mode: number) => TrackMapping[mode] || 'N/A';

  return (
    <div>
      <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Track Info</span>
        <FontAwesomeIcon
          icon={faHome}
          onClick={onToggleSelected}
          style={{ color: isSelectedForHome ? 'blue' : 'grey', cursor: 'pointer' }}
        />
      </h3>
      <div className="flex-container">
        <p>Name: {trackData[0]}</p>
      </div>
      <div className="flex-container">
        <p>Total Laps: {trackData[1]}</p>
      </div>
      <div className="flex-container">
        <p>Length: {trackData[2]}m</p>
      </div>
    </div>
  );
};

export default Track;

