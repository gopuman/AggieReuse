import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, ThemeProvider } from '@material-ui/core';
import axios from 'axios'
import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import LoginSignUpPage from './components/Login'
import { useState, useEffect } from 'react';
import Home from './components/Home';

const MyButton = ({ name, url }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <Button onClick={handleClick} color='inherit'>
      {name}
    </Button>
  );
};

const containerStyle= {
  // width: '100vw',
  // height: '100vh',
  backgroundImage: `url("https://www.ucdavis.edu/sites/default/files/styles/ucd_panoramic_image/public/media/images/administration-uc-davis.jpg?h=9de04ce3&itok=KbO0Kkp2")`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'repeat-y',
}

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

  const [name, setName] = useState('')

  axios.defaults.withCredentials = true;

  useEffect(() => {
      axios.get('http://localhost:3001')
      .then( res => {
        if(res.data.valid) {
          setName(res.data.username)
        }
      })
      .catch(err=> console.log(err))
    },[])

    function eventHandler (e) {
      if (e.target.value == "Logout") {
          setName("")
          e.target.value = "Login";
      }
    }

  return (
      <Router>
          <div style={containerStyle}>
            <MuiThemeProvider theme={theme}>
              <AppBar position="static">
              <Toolbar style={{ justifyContent: 'space-between' }}>
                  <Typography variant="h4" element={Link} to="/" style={{ fontWeight: "bold", textDecoration: 'none', color:"#FFBF00"}}>
                  Aggie Reuse
                  </Typography>
                  <Button element={Link} href="/" color="inherit">
                  Home
                  </Button>
                  <Button onClick = {(e) => eventHandler(e)} element={Link} href="/register" color="inherit">
                  {name ? name : 'Login'}
                  </Button>
                  <MyButton name="DASHBOARD" url="http://localhost:3000/goto/iSKZtmw4g?orgId=1"/>
                  <MyButton name="CROWD TRACKING" url="https://drive.google.com/file/d/1kH3XMbTdQYdpN1qRYLkrn5oGPm3aSZZT/view?usp=share_link"/>
              </Toolbar>
              </AppBar>
              {/* <InvTable/> */}
  
              <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/register" element={<LoginSignUpPage />} />
              </Routes>
              </MuiThemeProvider>
          </div>
      </Router>
      );
};

export default App;
