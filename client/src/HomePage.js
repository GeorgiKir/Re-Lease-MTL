import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImage from "./assets/facade1.jpg";
import { CurrentUserContext } from "./CurrentUserContext";
import { boroughs } from "./boroughs";
import { keyframes } from "styled-components";
import AboutUs from "./AboutUs";

const HomePage = ({ setNavigationState }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  console.log(boroughs);
  const handleNavigation = () => {
    navigate("/login");
  };

  useEffect(() => {
    setNavigationState("home");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <MainPageContainer style={{ marginTop: "0px", width: "100%" }}>
      <HomePageContentDiv>
        <HeroImageContainer>
          <SlideInTextDiv>
            <h2>Reduce.</h2>
          </SlideInTextDiv>
          <SlideInTextDiv>
            <h2>Reuse.</h2>
          </SlideInTextDiv>
          <SlideInTextDiv>
            <h2>Recycle.</h2>
          </SlideInTextDiv>
          <SlideInTextDiv>
            <h2>Re:Lease.</h2>
          </SlideInTextDiv>
        </HeroImageContainer>
      </HomePageContentDiv>
      <AboutUs id="about" />
    </MainPageContainer>
  );
};

const SlideInTextDiv = styled.div``;
const SlideInFromLeft = keyframes`
from {
  margin-left: -150%;
  opacity: 0;
}
to {
  margin-left: 0%;
  opacity: 1;
}
`;

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
  @media (max-width: 767.9px) {
    & h2 {
      color: white;
      font-size: 60px;
      font-weight: 500;
    }
  }
  overflow: hidden;
  & ${SlideInTextDiv}:nth-child(1) {
    animation: ${SlideInFromLeft} 1.5s ease-in;
  }
  & ${SlideInTextDiv}:nth-child(2) {
    animation: ${SlideInFromLeft} 1.75s ease-in;
  }
  & ${SlideInTextDiv}:nth-child(3) {
    animation: ${SlideInFromLeft} 2s ease-in;
  }
  & ${SlideInTextDiv}:nth-child(4) {
    animation: ${SlideInFromLeft} 2.25s ease-in;
  }
`;

const HomePageContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  /* width: 75vw; */
  height: 100vh;
`;

export const MainPageContainer = styled.div`
  @media (min-width: 768px) {
    margin-top: 75px;
    min-height: calc(100vh - 150px);
  }

  @media (max-width: 767.9px) {
    margin-top: 35px;
    /* height: calc(100vh - 180px); */
    min-height: calc(100vh);
  }

  background-size: cover;
`;
export default HomePage;
