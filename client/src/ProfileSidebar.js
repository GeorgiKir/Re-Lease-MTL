import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./Header";

const ProfileSidebar = ({ profileState, setProfileState }) => {
  console.log(profileState);
  return (
    <StyledProfileBar profileState={profileState}>
      <StyledProfileBarLink
        className={"StyledProfileBarLink"}
        onClick={() => {
          setProfileState("myListing");
        }}
      >
        <p>My Listing</p>
      </StyledProfileBarLink>
      <StyledProfileBarLink
        className={"StyledProfileBarLink"}
        onClick={() => {
          setProfileState("ListingSchedule");
        }}
      >
        <p>Listing Schedule</p>
      </StyledProfileBarLink>
      <StyledProfileBarLink
        className={"StyledProfileBarLink"}
        onClick={() => {
          setProfileState("VisitSchedule");
        }}
      >
        <p>Visit Schedule</p>
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
  /* background-color: #00abe4; */
  /* background-color: #7d98a1; */
  /* box-shadow: 0px 6px 15px -10px rgba(0, 0, 0, 0.64); */
  height: 55px;
  /* z-index: 1; */
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
