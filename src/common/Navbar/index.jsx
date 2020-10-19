import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: blue;
  height: 10vh;
`;

const Navbar = () => <NavbarContainer />;

export default Navbar;
