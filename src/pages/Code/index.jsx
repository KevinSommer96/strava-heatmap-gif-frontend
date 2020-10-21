import React, { useEffect } from 'react';
import axios from 'axios';
import { CenteredHashLoader } from '../../common/styles';
import HashLoader from 'react-spinners/HashLoader';
import { useAuth } from '../../context/AuthenticationProvider';

const Code = () => {
  const { authToken, setAuthToken } = useAuth();
  useEffect(() => {
    if (!authToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}`)
        .then((res) => window.location.replace(res.data.url));
    } else {
      setAuthToken(null);
    }
  }, [authToken, setAuthToken]);

  return (
    <CenteredHashLoader>
      <HashLoader size={150} />
    </CenteredHashLoader>
  );
};

export default Code;
