import React from 'react';
import { Container, Heading } from '../../common/styles';
import gifPic from '../../assets/gif.png';
import mapPic from '../../assets/map.png';
import styled from 'styled-components';

const Image = styled.img`
  width: 50vw;
  margin: 0 auto;
  margin-bottom: 2rem;
  border: 1px solid ${(props) => props.theme.colorMint};
`;

const Home = () => {
  return (
    <>
      <Container>
        <Heading>Generate Heatmap Gifs of Strava Activities</Heading>
      </Container>
      <Container>
        <Image src={mapPic} alt={'map'} />
      </Container>
      <Container>
        <Image src={gifPic} alt={'gif'} />
      </Container>
    </>
  );
};

export default Home;
