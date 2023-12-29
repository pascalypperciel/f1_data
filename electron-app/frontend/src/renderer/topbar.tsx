import React from 'react';
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

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    navigate(tabs[newValue].route);
  };

  return (
    <div className="topBar">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        {tabs.map((tab, index) => (
          <CustomTab key={index} label={tab.label} />
        ))}
      </Tabs>
    </div>
  );
}

export default TopBar;
