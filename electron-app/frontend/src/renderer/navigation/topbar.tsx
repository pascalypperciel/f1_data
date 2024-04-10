import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import CustomTab from './custom_tab';
import { styled } from '@mui/material/styles';

const StyledTopBar = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: theme.palette.background.paper,
}));

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
    <StyledTopBar >
      <Tabs value={validValue} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <CustomTab key={index} label={tab.label}/>
        ))}
      </Tabs>
    </StyledTopBar>
  );
}

export default TopBar;
