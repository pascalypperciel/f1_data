import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';

const CustomTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.secondary.main,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
}));

export default CustomTab;
