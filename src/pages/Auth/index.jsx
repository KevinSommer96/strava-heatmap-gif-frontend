import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthenticationProvider';
import { Redirect } from 'react-router-dom';

const Auth = () => {
  const { authToken, setAuthToken } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code) {
      axios
        .get('http://localhost:8000/authorised', { params: { code: code } })
        .then((res) => setAuthToken(res.data.access_token));
    }
  }, [setAuthToken]);
  if (authToken) return <Redirect to='/gif' />;
  return <div>auth page not authorised yet</div>;
};

export default Auth;
