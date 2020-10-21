import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  height: 6vh;
`;

const NavLink = styled.a`
  color: ${(props) => props.theme.colorMint};
  text-decoration: none;
  font-weight: 700;
  font-size: 2em;
  text-align: center;
  padding: auto 0;
  overflow: auto;
  width: 10%;
  padding: 0.1em 0;
`;

const Navbar = () => (
  <NavbarContainer>
    <NavLink href='/'>Home</NavLink>
    <NavLink href='/map'>Map</NavLink>
  </NavbarContainer>
);

export default Navbar;
