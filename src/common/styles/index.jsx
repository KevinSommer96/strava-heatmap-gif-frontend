import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  background-color: transparent;
  color: ${(props) => props.theme.colorVermillion};
`;

export const CenteredHashLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Heading = styled.h1`
  margin: 0 auto;
  padding: 0.5em 0;
`;
