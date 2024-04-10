import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0000FF',
    },
    secondary: {
      main: '#0000FF',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0000FF',
    },
    secondary: {
      main: '#0000FF',
    },
  },
});

export { lightTheme, darkTheme };
