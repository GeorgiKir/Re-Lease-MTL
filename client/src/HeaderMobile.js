import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch, FiUser } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { LangButton, NavContainer, StyledNav } from "./Header";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const HeaderMobile = ({ navigationState }) => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useContext(CurrentUserContext);
  const [languagesState, setLanguageState] = useState("english");
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <SmallStyledHeader>
      <NavContainer>
        <StyledNav>
          <GiHamburgerMenu
            style={{ fontSize: "30px" }}
            onClick={() => {
              setHamburgerMenuOpen(!hamburgerMenuOpen);
            }}
          />
        </StyledNav>
        <StyledNav
          to={"/"}
          onClick={() => {
            setHamburgerMenuOpen(false);
            setProfileMenu(false);
          }}
        >
          Re:Lease MTL
        </StyledNav>
        <StyledNav>
          <FiUser
            style={{ fontSize: "30px" }}
            onClick={() => {
              setProfileMenu(!profileMenu);
            }}
          />
        </StyledNav>
      </NavContainer>
      {hamburgerMenuOpen && (
        <HamburgerMenu HamburgerMenu={hamburgerMenuOpen}>
          <StyledNav to={"/search"}>
            <FiSearch
              style={{
                fontSize: "25px",
              }}
              onClick={() => {
                setHamburgerMenuOpen(false);
                setProfileMenu(false);
              }}
            />
          </StyledNav>

          {navigationState === "home" && (
            <a
              href="#about"
              onClick={() => {
                setHamburgerMenuOpen(false);
              }}
            >
              {t("header.aboutUs")}
            </a>
          )}
          {languagesState === "french" && (
            <LangButton
              style={{ padding: "0" }}
              onClick={() => {
                changeLanguage("en");
                setLanguageState("english");
                setHamburgerMenuOpen(false);
              }}
            >
              EN
            </LangButton>
          )}
          {languagesState === "english" && (
            <LangButton
              style={{ padding: "0" }}
              onClick={() => {
                changeLanguage("fr");
                setLanguageState("french");
                setHamburgerMenuOpen(false);
              }}
            >
              FR
            </LangButton>
          )}
        </HamburgerMenu>
      )}
      {profileMenu && (
        <HamburgerMenu ProfileMenu={profileMenu}>
          {currentUser && (
            <StyledNav
              to={"/profile"}
              onClick={() => {
                setHamburgerMenuOpen(false);
                setProfileMenu(false);
              }}
            >
              <p>Profile</p>
            </StyledNav>
          )}
          <LoginButton />
          <LogoutButton />
        </HamburgerMenu>
      )}
    </SmallStyledHeader>
  );
};

const HamburgerMenu = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
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

  align-items: ${(props) => (props.ProfileMenu ? "flex-end" : "flex-start")};
  justify-content: space-evenly;
  padding-left: ${(props) => (props.ProfileMenu ? "" : "30px")};
  padding-right: ${(props) => (props.ProfileMenu ? "30px" : "")};
  position: absolute;

  margin: ${(props) =>
    props.ProfileMenu ? "65px 5px 0px 0px;" : "65px 0px 0px 5px;"};
  /* width: 40%; */
  width: 150px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0px 6px 15px -10px rgba(0, 0, 0, 0.64);
  background-color: #0078a0;
  ${(props) => (props.ProfileMenu ? "right: 0" : "")}
`;

const SmallStyledHeader = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: flex;
  }
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;

  background-color: #0078a0;
  height: 55px;
  z-index: 2;
  color: white;
  top: 0;
`;

export default HeaderMobile;
