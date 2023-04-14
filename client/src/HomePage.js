import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImage from "./assets/facade1.jpg";
import { CurrentUserContext } from "./CurrentUserContext";
import { boroughs } from "./boroughs";

const HomePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  console.log(boroughs);
  const handleNavigation = () => {
    navigate("/login");
  };
  return (
    <MainPageContainer style={{ marginTop: "0px", width: "100%" }}>
      <HomePageContentDiv>
        <HeroImageContainer>
          <h2>Reduce.</h2>
          <h2>Reuse.</h2>
          <h2>Recycle.</h2>
          <h2>Re:Lease.</h2>
        </HeroImageContainer>
      </HomePageContentDiv>{" "}
    </MainPageContainer>
  );
};

const HeroImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${bgImage});
  width: 100%;
  height: 100vh;
  margin: 0px auto 0px auto;
  background-size: 100% 100%;
  /* border-radius: 5px; */
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.65);
  @media (min-width: 768px) {
    & h2 {
      color: white;
      font-size: 100px;
      font-weight: 500;
    }
  }
  @media (max-width: 767px) {
    & h2 {
      color: white;
      font-size: 60px;
      font-weight: 500;
    }
  }
`;

const HomePageContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  /* width: 75vw; */
  height: 100%;
`;

export const MainPageContainer = styled.div`
  @media (min-width: 768px) {
    margin-top: 75px;
    min-height: calc(100vh - 180px);
  }

  @media (max-width: 767px) {
    margin-top: 35px;
    /* height: calc(100vh - 180px); */
    height: calc(100vh);
  }

  background-size: cover;
`;
export default HomePage;
