import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthenticationProvider';

const Gif = () => {
  const { authToken, setAuthToken } = useAuth();

  useEffect(() => {
    if (!authToken) {
      axios
        .get('http://localhost:8000/')
        .then((res) => window.location.replace(res.data.url));
    }
  }, [authToken, setAuthToken]);
  return <div>{authToken}</div>;
};

export default Gif;
