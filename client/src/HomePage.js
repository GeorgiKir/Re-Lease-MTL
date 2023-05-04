import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiRightArrow } from "react-icons/bi";
import styled, { keyframes } from "styled-components";
import AboutUs from "./AboutUs";
import { CurrentUserContext } from "./CurrentUserContext";
import OurProcess from "./OurProcess";
import SpinnerLoading from "./SpinnerLoading";
import bgImage from "./assets/facade1.jpg";

const HomePage = ({ setNavigationState }) => {
  const { t, i18n } = useTranslation();
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const [isLoaded, setIsLoaded] = useState(false);
  const { loginContext, currentUser, verificationState } =
    useContext(CurrentUserContext);
  const handleLogin = () => {
    loginContext();
    loginWithRedirect();
  };

  useEffect(() => {
    setNavigationState("home");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <SpinnerLoading main={true} />;
  }

  return (
    <MainPageContainer style={{ marginTop: "0px", width: "100%" }}>
      {isLoaded && (
        <>
          <HomePageContentDiv>
            <HeroImageContainer>
              <div>
                <h2>{t("heroImage.reduce")}</h2>
              </div>
              <div>
                <h2>{t("heroImage.reuse")}</h2>
              </div>
              <div>
                <h2>{t("heroImage.recycle")}</h2>
              </div>
              <div>
                <h2>Re:Lease.</h2>
              </div>
              {!user && !isLoading && (
                <CustomSignUpButton
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  <p style={{ margin: "10px", fontSize: "35px" }}>
                    {t("heroImage.signup")}
                  </p>
                  <BiRightArrow size={40} />
                </CustomSignUpButton>
              )}
            </HeroImageContainer>
          </HomePageContentDiv>
          <AboutUs />
          <OurProcess />
        </>
      )}
    </MainPageContainer>
  );
};

export const CustomSignUpButton = styled.button`
  position: relative;
  font-family: "Montserrat", sans-serif;
  border: none;
  background: none;
  cursor: pointer;
  color: white;
  display: flex;
  gap: 5px;
  height: fit-content;
  margin-top: 3%;
  padding: 0;
  align-items: center;
  &::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-color: white;
    position: absolute;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;

const SlideInFromLeft = keyframes`
from {
 
  transform: translateX(-150%);
  opacity: 0;
}
to {
 
  transform: translateX(0%);
  opacity: 1;
}
`;

const HeroImageContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 150px;
  align-items: center;
  background-image: url(${bgImage});
  width: 100%;
  height: 100vh;
  margin: 0px auto 0px auto;
  background-size: 100% 100%;

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
  & div:nth-child(1) {
    animation: ${SlideInFromLeft} 0.5s ease-in;
  }
  & div:nth-child(2) {
    animation: ${SlideInFromLeft} 0.75s ease-in;
  }
  & div:nth-child(3) {
    animation: ${SlideInFromLeft} 1s ease-in;
  }
  & div:nth-child(4) {
    animation: ${SlideInFromLeft} 1.25s ease-in;
  }
`;

const HomePageContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
`;

export const MainPageContainer = styled.div`
  @media (min-width: 870px) {
    margin-top: 75px;
    min-height: calc(100vh - 150px);
  }

  @media (max-width: 870px) {
    margin-top: 35px;

    min-height: calc(100vh);
  }

  background-size: cover;
`;
export default HomePage;
