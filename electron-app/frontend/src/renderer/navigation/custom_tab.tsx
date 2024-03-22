import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

const CustomTab = styled(Tab)({
  '&.Mui-selected': {
    color: 'blue',
    borderBottom: '2px solid blue',
  },
});

export default CustomTab;
