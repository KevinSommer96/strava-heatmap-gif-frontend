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

const Gif = (props) => {
  const { authToken } = useAuth();
  const coords = props.location.state.coords;

  console.log('coords', props.location.state.coords);

  const [gifData, setGifData] = useState(undefined);

  const getGif = (access_token, coords) => {
    const longitudes = coords.map((el) => el[0]);
    const latitudes = coords.map((el) => el[1]);

    if (coords.length !== 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/gif/`, {
          params: {
            access_token,
            min_lon: Math.min(...longitudes),
            max_lat: Math.max(...latitudes),
            max_lon: Math.max(...longitudes),
            min_lat: Math.min(...latitudes),
          },
        })
        .then((res) => setGifData(res.data.gif));
    }
  };

  useEffect(() => {
    getGif(authToken, coords);
  }, [authToken, coords]);

  return (
    <div>
      {gifData ? (
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
