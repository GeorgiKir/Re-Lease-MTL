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
  color: white;
  text-decoration: none;
  /* font-size: 20px; */
  cursor: pointer;
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
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 55px;
  background-color: #7d98a1;
  box-shadow: 0px 6px 15px -10px rgba(0, 0, 0, 0.64);
  height: 35px;
  z-index: 1;
  color: white;
  top: 0;
  & .StyledProfileBarLink:nth-child(1) {
    border-bottom: ${(props) =>
      props.profileState == "myListing" ? "2px solid white" : "none"};
  }
  & .StyledProfileBarLink:nth-child(2) {
    border-bottom: ${(props) =>
      props.profileState == "ListingSchedule" ? "2px solid white" : "none"};
  }
  & .StyledProfileBarLink:nth-child(3) {
    border-bottom: ${(props) =>
      props.profileState == "VisitSchedule" ? "2px solid white" : "none"};
  }
`;
export default ProfileSidebar;
