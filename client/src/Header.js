import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useContext, useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { CurrentUserContext } from "./CurrentUserContext";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import HeaderMobile from "./HeaderMobile";
import { Trans, useTranslation } from "react-i18next";

const Header = ({ navigationState }) => {
  const { t, i18n } = useTranslation();
  const [languagesState, setLanguageState] = useState("english");

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <>
      <StyledHeader>
        <NavContainer>
          <StyledNav to={"/"}>Re:Lease MTL</StyledNav>
          {navigationState === "home" && (
            <a href="#about">{t("header.aboutUs")}</a>
          )}
          <StyledNav to={"/search"}>
            <FiSearch style={{ fontSize: "25px" }} />
          </StyledNav>
        </NavContainer>
        <ProfileOptionsContainer>
          {languagesState === "french" && (
            <button
              onClick={() => {
                changeLanguage("en");
                setLanguageState("english");
              }}
            >
              EN
            </button>
          )}
          {languagesState === "english" && (
            <button
              onClick={() => {
                changeLanguage("fr");
                setLanguageState("french");
              }}
            >
              FR
            </button>
          )}
          {currentUser && (
            <>
              <p>
                {t("header.hello")} {currentUser.nickname}!
              </p>
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
`;

const ProfileOptionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 25%;
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
  & a {
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
  background-color: #0078a0;
  /* background-color: #1c2321; */
  height: 55px;
  z-index: 2;
  color: white;
  top: 0;
`;

export default Header;
