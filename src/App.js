import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthenticationProvider';
import Home from './pages/Home';
import Gif from './pages/Gif';
import Auth from './pages/Auth';
import Navbar from './common/Navbar';

const App = () => {
  const existingToken = JSON.parse(localStorage.getItem('token'));
  const [authToken, setAuthToken] = useState(existingToken);

  const setToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthToken(data);
  };

  return (
    <div>
      <Navbar />
      <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
        <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/gif' component={Gif} />
          <Route path='/authorised' component={Auth} />
        </Router>
      </AuthContext.Provider>
    </div>
  );
};
export default App;
