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
import { useAuth0 } from "@auth0/auth0-react";
import ProfileDropDownMenu from "./ProfileDropDownMenu";
import { ProfileStyledButton } from "./Profile";

const Header = ({ navigationState }) => {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const { t, i18n } = useTranslation();
  const [languagesState, setLanguageState] = useState("english");
  const [showProfileTab, setShowProfileTab] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const { currentUser, verificationState } = useContext(CurrentUserContext);
  return (
    <>
      <StyledHeader>
        {!isLoading && (
          <>
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
              {currentUser && !isLoading && (
                <>
                  <p>
                    {t("header.hello")} {currentUser.nickname}!
                  </p>
                </>
              )}
              {languagesState === "french" && (
                <LangButton
                  onClick={() => {
                    changeLanguage("en");
                    setLanguageState("english");
                  }}
                >
                  EN
                </LangButton>
              )}
              {languagesState === "english" && (
                <LangButton
                  onClick={() => {
                    changeLanguage("fr");
                    setLanguageState("french");
                  }}
                >
                  FR
                </LangButton>
              )}

              <LangButton
                onClick={() => {
                  setShowProfileTab(!showProfileTab);
                }}
              >
                <FiUser style={{ fontSize: "30px" }} />
              </LangButton>
              {showProfileTab && (
                <ProfileDropDownMenu setShowProfileTab={setShowProfileTab} />
              )}

              {/* <StyledNav to={"/profile"}>
                <FiUser style={{ fontSize: "30px" }} />
              </StyledNav> */}
              {/* <LogoutButton /> */}

              {/* {!currentUser && !isLoading && <LoginButton />} */}
            </ProfileOptionsContainer>
          </>
        )}
      </StyledHeader>
      <HeaderMobile />
    </>
  );
};

const LangButton = styled.button`
  display: flex;
  position: relative;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  /* margin: 0 10%; */
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  font-weight: 600;
  &::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: white;
    position: absolute;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;

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
  width: 15%;
  /* width: fit-content; */
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
