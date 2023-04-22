import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./Header";
import { Trans, useTranslation } from "react-i18next";

const ProfileSidebar = ({ profileState, setProfileState }) => {
  const { t, i18n } = useTranslation();
  console.log(profileState);
  return (
    <StyledProfileBar profileState={profileState}>
      <StyledProfileBarLink
        className={"StyledProfileBarLink"}
        onClick={() => {
          setProfileState("myListing");
        }}
      >
        <p>{t("profileHeader.myListing")}</p>
      </StyledProfileBarLink>
      <StyledProfileBarLink
        className={"StyledProfileBarLink"}
        onClick={() => {
          setProfileState("ListingSchedule");
        }}
      >
        <p>{t("profileHeader.listingSchedule")}</p>
      </StyledProfileBarLink>
      <StyledProfileBarLink
        className={"StyledProfileBarLink"}
        onClick={() => {
          setProfileState("VisitSchedule");
        }}
      >
        <p>{t("profileHeader.visitSchedule")}</p>
      </StyledProfileBarLink>
    </StyledProfileBar>
  );
};

const StyledProfileBarLink = styled(NavLink)`
  color: #0078a0;
  text-decoration: none;
  /* font-size: 20px; */
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    scale: 1.3;
  }
`;

const StyledProfileBar = styled.div`
  @media (min-width: 768px) {
    font-size: 20px;
    gap: 5%;
  }
  @media (max-width: 767px) {
    font-size: 15px;
    gap: 10%;
  }
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 55px auto 0px auto;
  background-color: transparent;
  height: 55px;
  color: #0078a0;
  top: 0;
  & .StyledProfileBarLink:nth-child(1) {
    border-bottom: ${(props) =>
      props.profileState == "myListing" ? "2px solid #0078a0" : "none"};
  }
  & .StyledProfileBarLink:nth-child(2) {
    border-bottom: ${(props) =>
      props.profileState == "ListingSchedule" ? "2px solid #0078a0" : "none"};
  }
  & .StyledProfileBarLink:nth-child(3) {
    border-bottom: ${(props) =>
      props.profileState == "VisitSchedule" ? "2px solid #0078a0" : "none"};
  }
`;
export default ProfileSidebar;
