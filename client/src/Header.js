import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderMobile from "./HeaderMobile";

const Header = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <>
      <StyledHeader>
        <NavContainer>
          <StyledNav to={"/"}>Re:Lease MTL</StyledNav>
          <StyledNav>About us</StyledNav>
          <StyledNav to={"/search"}>
            <FiSearch style={{ fontSize: "25px" }} />
          </StyledNav>
        </NavContainer>
        <ProfileOptionsContainer>
          {currentUser && (
            <>
              <p>{currentUser.nickname}</p>
              <StyledNav to={"/profile"}>
                <FiUser style={{ fontSize: "30px" }} />
              </StyledNav>
            </>
          )}
          <LoginButton />
          <LogoutButton />
        </ProfileOptionsContainer>
      </StyledHeader>
      <HeaderMobile />
      {/* <SmallStyledHeader>
        <NavContainer>
          <StyledNav>
            <GiHamburgerMenu style={{ fontSize: "30px" }} />
          </StyledNav>
          <StyledNav to={"/"}>RE:lease MTL</StyledNav>
          <StyledNav>
            <FiUser style={{ fontSize: "30px" }} />
          </StyledNav>
        </NavContainer>
      </SmallStyledHeader> */}
    </>
  );
};

export const StyledNav = styled(NavLink)`
  /* color: black; */
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  @media (min-width: 768px) {
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
  }

  /* &.active {
    color: wheat;
  } */
`;

const ProfileOptionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 15%;
  margin: 0px 10%;
  position: relative;
`;

export const NavContainer = styled.div`
  margin: 0px 7%;
  display: flex;

  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    gap: 50px;
    width: fit-content;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const StyledHeader = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
  @media (max-width: 767px) {
    display: none;
  }
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  /* background-color: #efefef; */
  background-color: #1c2321;
  height: 55px;
  z-index: 2;
  color: white;
  top: 0;
`;

export default Header;
