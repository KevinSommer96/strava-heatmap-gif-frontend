import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthenticationProvider";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
import { Container, Heading } from "../../common/styles";

const CenteredHashLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GifImg = styled.img`
  display: block;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.colorHighlight};
`;

const DownloadButton = styled.a`
  margin: 0 auto;
  color: ${(props) => props.theme.colorHighlight};
  font-size: 150%;
  text-decoration: none;

  :hover {
    color: ${(props) => props.theme.colorLimeLight};
    text-decoration: none;
  }
`;

const Gif = (props) => {
  const { authToken } = useAuth();
  const coords = props.location.state.coords;

  console.log("coords", props.location.state.coords);

  const [gifData, setGifData] = useState(undefined);

  useEffect(() => {
    const longitudes = coords.map((el) => el[0]);
    const latitudes = coords.map((el) => el[1]);

    if (coords.length !== 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/gif/`, {
          params: {
            access_token: authToken,
            min_lon: Math.min(...longitudes),
            max_lat: Math.max(...latitudes),
            max_lon: Math.max(...longitudes),
            min_lat: Math.min(...latitudes),
            ratio: props.location.state.ratio,
            colour: props.location.state.colour,
            backgroundColour: props.location.state.backgroundColour,
            alpha: props.location.state.alpha,
          },
        })
        .then((res) => setGifData(res.data.gif));
    }
  }, [authToken, coords, props.location.state]);

  return (
    <div>
      {gifData ? (
        <>
          <Container>
            <Heading>Result</Heading>
          </Container>
          <GifImg src={"data:image/gif;base64," + gifData} alt="ok" />
          <Container style={{ padding: "1.5em 0" }}>
            <DownloadButton href={"data:image/gif;base64," + gifData} download>
              Download
            </DownloadButton>
          </Container>
        </>
      ) : (
        <CenteredHashLoader>
          <HashLoader size={200} />
        </CenteredHashLoader>
      )}
    </div>
  );
};

export default Gif;
