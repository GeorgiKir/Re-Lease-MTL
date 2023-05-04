import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ProfileSidebar = ({ profileState, setProfileState }) => {
  const { t, i18n } = useTranslation();
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
    scale: 1.2;
  }
`;

const StyledProfileBar = styled.div`
  @media (min-width: 768px) {
    font-size: 20px;
    gap: 5%;
    width: 100%;
  }
  @media (max-width: 767px) {
    font-size: 12px;
    gap: 6%;
    width: 100%;
  }

  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
