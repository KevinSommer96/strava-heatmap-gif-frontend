import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthenticationProvider';
import styled, { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Code from './pages/Code';
import Gif from './pages/Gif';
import Auth from './pages/Auth';
import Map from './pages/Map';
import Navbar from './common/Navbar';
import PrivateRoute from './common/PrivateRoute';
import theme from './theme';

const Background = styled.div`
  color: white;
  background: ${(props) => props.theme.colorBackground};
  height: 100vh;
  /* background: linear-gradient(
    90deg,
    rgba(64, 52, 52, 1) 0%,
    rgba(21, 91, 67, 1) 100%
  ); */
`;

const App = () => {
  const existingToken = JSON.parse(localStorage.getItem('token'));
  const [authToken, setAuthToken] = useState(existingToken);

  const setToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthToken(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Navbar />
        <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
          <Router>
            <Route exact path='/' component={Home} />
            <Route path='/code' component={Code} />
            <Route path='/authorised' component={Auth} />
            <PrivateRoute path='/map' component={Map} />
            <PrivateRoute path='/gif' component={Gif} />
          </Router>
        </AuthContext.Provider>
      </Background>
    </ThemeProvider>
  );
};
export default App;
