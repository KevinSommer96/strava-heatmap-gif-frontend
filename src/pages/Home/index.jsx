import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthenticationProvider';

const Home = () => {
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
  return <div>{authToken ? authToken : <div>k</div>}</div>;
};

export default Home;
