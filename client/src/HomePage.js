import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImage from "./assets/facade_1.png";
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
    <MainPageContainer>
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
  width: 75%;
  height: 350px;
  margin: 35px auto 0px auto;
  background-size: 100% 100%;
  border-radius: 5px;
  & h2 {
    color: white;
    font-size: 50px;
    font-weight: 500;
  }
`;

const HomePageContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 75vw;
  height: 90vh;
`;

export const MainPageContainer = styled.div`
  height: 100vh;
  /* background-image: url(${bgImage}); */
  background-size: cover;
  margin-top: 75px;
`;
export default HomePage;
