import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  background-color: transparent;
  color: ${(props) => props.theme.colorMint};
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

export const Button = styled.button`
  width: 100%;
  max-width: 30%;
  height: 1.5em;
  font-weight: 700;
  background-color: ${(props) => props.theme.colorBackground};
  border: 1px solid ${(props) => props.theme.colorMint};
  border-radius: 0.2em;
  color: ${(props) => props.theme.colorMint};
  text-align: center;
  text-decoration: none;
  box-shadow: none;
  font-size: inherit;
  position: relative;
  margin: 10px 0;
  transition: color 0.2s ease-in;
  transition: border 0.2s ease-in;

  :hover {
    border: 1px solid ${(props) => props.theme.colorVermillion};
    color: ${(props) => props.theme.colorVermillion};
    box-shadow: none;
  }
`;
