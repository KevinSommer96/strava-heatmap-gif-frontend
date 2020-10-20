import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthenticationProvider';
import HashLoader from 'react-spinners/HashLoader';
import styled from 'styled-components';

const CenteredHashLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Gif = () => {
  const { authToken, setAuthToken } = useAuth();

  const [activities, setActivities] = useState([]);

  const [gif, setGif] = useState(undefined);

  const [gifData, setGifData] = useState(undefined);

  useEffect(() => {
    if (!authToken) {
      axios
        .get('http://localhost:8000/')
        .then((res) => window.location.replace(res.data.url));
    }
  }, [authToken, setAuthToken]);

  useEffect(() => {
    if (authToken && activities.length === 0) {
      axios
        .get('http://localhost:8000/activities/', {
          params: { access_token: authToken },
        })
        .then((res) => setActivities(res.data.activities));
    }
  }, [activities, authToken]);

  useEffect(() => {
    if (authToken && activities.length !== 0) {
      axios
        .get('http://localhost:8000/gif/', {
          params: { access_token: authToken },
        })
        .then((res) => {
          console.log('done', res);
          setGifData(res.data.gif);
          setGif('gif');
        });
    }
  }, [authToken, activities]);
  return (
    <div>
      {gif ? (
        <img src={'data:image/gif;base64,' + gifData} alt='ok' />
      ) : (
        <CenteredHashLoader>
          <HashLoader size={200} />
        </CenteredHashLoader>
      )}
    </div>
  );
};

export default Gif;
