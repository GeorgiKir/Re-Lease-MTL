import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./Header";

const ProfileSidebar = ({ setProfileState }) => {
  return (
    <StyledProfileBar>
      <StyledNav>My Listing</StyledNav>
      <StyledNav>Listing Schedule</StyledNav>
      <StyledNav>Visit Schedule</StyledNav>
    </StyledProfileBar>
  );
};
const StyledProfileBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 75px;
  background-color: #41413f;
  height: 35px;
  z-index: 2;
  gap: 5%;
  font-size: 20px;
  color: white;
  top: 0;
`;
export default ProfileSidebar;
