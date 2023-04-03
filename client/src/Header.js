import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Header = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <>
      <StyledHeader>
        <NavContainer>
          <StyledNav to={"/"}>RE:lease MTL</StyledNav>
          <StyledNav to={"/search"}>SEARCH</StyledNav>
          <StyledNav>INFO</StyledNav>
        </NavContainer>
        <ProfileOptionsContainer>
          {currentUser && <StyledNav to={"/profile"}>PROFILE</StyledNav>}
          <LoginButton />
          <LogoutButton />
        </ProfileOptionsContainer>
      </StyledHeader>
    </>
  );
};

export const StyledNav = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  cursor: pointer;
  &:after {
    display: block;
    content: "";
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover:after {
    transform: scaleX(1);
  }
`;

const ProfileOptionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 15%;
  margin: 0px 10%;
  position: relative;
`;

const NavContainer = styled.div`
  margin: 0px 7%;
  display: flex;
  width: fit-content;
  gap: 60px;
  justify-content: space-between;
  align-items: center;
`;

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  background-color: black;
  height: 75px;
  z-index: 2;
  color: white;
  top: 0;
`;

export default Header;
