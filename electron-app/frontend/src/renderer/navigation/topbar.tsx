import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import CustomTab from './custom_tab';
import "./topbar.css";

interface TabData {
  label: string;
  route: string;
}

interface TopBarProps {
  tabs: TabData[];
}

const TopBar: React.FC<TopBarProps> = ({ tabs }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState<number>(0);

  useEffect(() => {
    setValue(0);
    navigate(tabs[0].route);
  }, [tabs]);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    navigate(tabs[newValue].route);
  };

  const validValue = tabs.length > 0 ? Math.min(value, tabs.length - 1) : false;

  return (
    <div className="topBar">
      <Tabs value={validValue} onChange={handleChange} aria-label="navigation tabs">
        {tabs.map((tab, index) => (
          <CustomTab key={index} label={tab.label} />
        ))}
      </Tabs>
    </div>
  );
}

export default TopBar;
