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
  font-size: 20px;
  cursor: pointer;
  /* &:after {
    display: block;
    content: "";
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover:after {
    transform: scaleX(1);
  } */
`;

const StyledProfileBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 55px;
  background-color: #41413f;
  height: 35px;
  z-index: 2;
  gap: 5%;
  font-size: 20px;
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
