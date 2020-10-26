import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthenticationProvider';
import { Redirect } from 'react-router-dom';
import { CenteredHashLoader } from '../../common/styles';
import HashLoader from 'react-spinners/HashLoader';

const Auth = () => {
  const { authToken, setAuthToken, setExpiresAt } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/authorised/`, {
          params: { code: code },
        })
        .then((res) => {
          setAuthToken(res.data.access_token); 
          setExpiresAt(res.data.expires_at);}
          );
    }
  }, [setAuthToken, setExpiresAt]);
  if (authToken) return <Redirect to='/map' />;
  return (
    <CenteredHashLoader>
      <HashLoader size={150} />
    </CenteredHashLoader>
  );
};

export default Auth;
