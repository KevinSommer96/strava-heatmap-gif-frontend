import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthenticationProvider";
import styled, { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import Code from "./pages/Code";
import Gif from "./pages/Gif";
import Auth from "./pages/Auth";
import Map from "./pages/Map";
import Navbar from "./common/Navbar";
import PrivateRoute from "./common/PrivateRoute";
import theme from "./theme";

const Background = styled.div`
  color: ${(props) => props.theme.colorHighlight};
  background: ${(props) => props.theme.colorBackground};
  background-repeat: repeat;
  min-height: 100vh;
`;

const App = () => {
  const existingToken = JSON.parse(localStorage.getItem("token"));
  const existingExpireDate = JSON.parse(localStorage.getItem("expiresAt"))
  const [authToken, setAuthToken] = useState(existingToken);
  const [expiresAt, setExpiresAt] = useState(existingExpireDate)

  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };

  const setExpireDate = (data) => {
    localStorage.setItem("expiresAt", JSON.stringify(data)); 
    setExpiresAt(data);
  }


  useEffect(() => {
    if (expiresAt) {
      if (Math.floor(Date.now() / 1000) > expiresAt) {
        setExpireDate('');
        setToken('')
      } 
    }
    
  }, [expiresAt])


  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Navbar />
        <AuthContext.Provider value={{ authToken, setAuthToken: setToken, expiresAt, setExpiresAt: setExpireDate }}>
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/code" component={Code} />
            <Route path="/authorised" component={Auth} />
            <PrivateRoute path="/map" component={Map} />
            <PrivateRoute path="/gif" component={Gif} />
          </Router>
        </AuthContext.Provider>
      </Background>
    </ThemeProvider>
  );
};
export default App;
