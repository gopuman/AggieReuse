import React, { Component } from 'react';
import Nav from './components/Nav'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#023366',
    },
    secondary: {
      main: '#FFBF00',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const App = () => {
  return (
    <div className='App'>
      <MuiThemeProvider theme={theme}>
      <Nav />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
