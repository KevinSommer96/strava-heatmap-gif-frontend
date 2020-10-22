import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  top: 0;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  height: 6vh;
`;

const NavLink = styled.a`
  color: ${(props) => props.theme.colorHighlight};
  text-decoration: none;
  font-weight: 700;
  height: 6vh;
  line-height: 6vh;
  font-size: 2em;
  text-align: center;
  overflow: auto;
  width: 10%;
`;

const LinkContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Navbar = () => (
  <NavbarContainer>
    <LinkContainer>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/map">Map</NavLink>
    </LinkContainer>
  </NavbarContainer>
);

export default Navbar;
