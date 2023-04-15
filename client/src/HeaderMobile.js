import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { NavContainer, StyledNav } from "./Header";
import { FiSearch, FiUser } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const HeaderMobile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
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
        <StyledNav to={"/"}>Re:Lease MTL</StyledNav>
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
          <StyledNav style={{ fontSize: "15px", fontWeight: "400" }}>
            About us
          </StyledNav>
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
          {!currentUser && <button>Sign Up</button>}
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

  align-items: ${(props) => (props.ProfileMenu ? "flex-end" : "flex-start")};
  justify-content: space-evenly;
  padding-left: ${(props) => (props.ProfileMenu ? "" : "40px")};
  padding-right: ${(props) => (props.ProfileMenu ? "40px" : "")};
  position: absolute;
  margin-top: 55px;
  border-bottom-right-radius: ${(props) => (props.ProfileMenu ? "" : "5px")};
  border-bottom-left-radius: ${(props) => (props.ProfileMenu ? "5px" : "")};
  width: 30%;
  height: 85px;
  background-color: rgba(28, 35, 33, 0.81);
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
  background-color: #1c2321;
  height: 55px;
  z-index: 2;
  color: white;
  top: 0;
`;

export default HeaderMobile;
