import React from "react";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Trans, useTranslation } from "react-i18next";

const ProfileDropDownMenu = ({ setShowProfileTab }) => {
  const { t, i18n } = useTranslation();
  const { loginWithRedirect, isAuthenticated, user, isLoading, logout } =
    useAuth0();
  const { currentUser, loginContext, logoutContext } =
    useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutContext();
    logout();
  };

  const handleLogin = () => {
    loginContext();
    loginWithRedirect();
  };
  return (
    <ProfileDropDownMainContainer>
      {currentUser && (
        <>
          <ProfileDropDownButton
            onClick={() => {
              setShowProfileTab(false);
              navigate("/profile");
            }}
          >
            {t("header.profile")} <SlArrowRight />
          </ProfileDropDownButton>
          <ProfileDropDownButton
            onClick={() => {
              setShowProfileTab(false);
              handleLogout();
            }}
          >
            {t("header.logout")} <SlArrowRight />
          </ProfileDropDownButton>
        </>
      )}
      {!currentUser && (
        <>
          <ProfileDropDownButton
            onClick={() => {
              setShowProfileTab(false);
              handleLogin();
            }}
          >
            {t("header.login")} <SlArrowRight />
          </ProfileDropDownButton>
          <ProfileDropDownButton
            onClick={() => {
              setShowProfileTab(false);
              handleLogin();
            }}
          >
            {t("heroImage.signup")} <SlArrowRight />
          </ProfileDropDownButton>
        </>
      )}
    </ProfileDropDownMainContainer>
  );
};

const ProfileDropDownButton = styled.button`
  position: relative;
  font-family: "Montserrat", sans-serif;
  border: none;
  background: none;
  font-weight: 600;
  cursor: pointer;
  color: white;
  display: flex;
  font-size: 20px;
  gap: 5px;
  height: fit-content;
  margin-top: 3%;
  margin-bottom: 5%;
  padding-bottom: 3px;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  &:hover {
    background-color: #00abe4;
    border-radius: 5px;
  }
  /* &::before {
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
  } */
`;

const ProfileDropDownMainContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  top: 55px;
  right: -10%;
  width: 200px;
  /* height: 100px; */
  height: fit-content;
  padding: 15px 0px;
  background-color: #0078a0;
  /* background-color: #00abe4; */
  box-shadow: 0px 6px 15px -10px rgba(0, 0, 0, 0.64);
  border-radius: 10px;
  /* align-self: flex-end; */
`;
export default ProfileDropDownMenu;