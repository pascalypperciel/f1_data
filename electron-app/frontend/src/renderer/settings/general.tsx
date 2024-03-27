import React from 'react';
import { Switch } from '@mui/material';
import './settings.css';

interface GeneralProps {
  onToggleDarkMode: () => void;
  darkMode: boolean;
}

const General: React.FC<GeneralProps> = ({ onToggleDarkMode, darkMode }) => {
  return (
    <div className="general-spacing">
      <h4>Appearance:</h4>
      <div>
        Dark Mode:
        <Switch checked={darkMode} onChange={onToggleDarkMode} />
      </div>
    </div>
  );
};

export default General;
