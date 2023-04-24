import React from "react";
import styled from "styled-components";
import blueBgImg from "./assets/blue_bg.jpg";
import movingImg from "./assets/moving1.jpg";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { Trans, useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  return (
    <AboutUsContainerDiv id="about">
      <FirstImgContainer>
        <img src={movingImg} />
      </FirstImgContainer>
      <AboutUsTextDiv>
        <h2>{t("aboutUs.part1")}</h2>
        <h1>{t("aboutUs.part2")}</h1>
        <h1>{t("aboutUs.part3")}</h1>
        <br />
        <div
          style={{
            display: "flex",
            width: "fit-content",
            alignItems: "flex-end",
            justifyContent: "space-between",
            // border: "1px solid black",
          }}
        >
          <AboutUsLinkButton style={{ margin: "0px", padding: "0px" }}>
            <a
              target="_blank"
              href="https://www.tal.gouv.qc.ca/en/assignment-of-a-lease-or-subleasing/assignment-of-lease-agreement-and-notice-to-sublet-the-dwelling"
            >
              <p>{t("aboutUs.link1")}</p>
            </a>
          </AboutUsLinkButton>
          <SlArrowRight
            style={{
              color: "#00abe4",
              fontSize: "25px",
              marginLeft: "10px",
              padding: "5px",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            width: "fit-content",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <AboutUsLinkButton style={{ margin: "0px", padding: "0px" }}>
            <p>{t("aboutUs.link2")}</p>
          </AboutUsLinkButton>
          <SlArrowRight
            style={{
              color: "#00abe4",
              fontSize: "25px",
              marginLeft: "10px",
              padding: "5px",
            }}
          />
        </div>
        {/* Lease reassignment made easy: */}
        {/* <h1 style={{ marginLeft: "50px" }}>1. Create an account</h1>
        <h1 style={{ marginLeft: "100px" }}>2. Post your listing</h1>
        <h1 style={{ marginLeft: "150px" }}>3. Show your place</h1>
        <h1 style={{ marginLeft: "200px" }}>4. Re:Assign!</h1> */}
      </AboutUsTextDiv>
    </AboutUsContainerDiv>
  );
};

const AboutUsLinkButton = styled.button`
  position: relative;
  /* display: flex;
  justify-content: flex-start; */
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  gap: 5px;
  height: fit-content;
  margin-top: 5%;
  /* padding: 5px; */
  align-items: center;
  & p {
    font-family: "Montserrat", sans-serif;
    color: #00abe4;
    font-weight: 600;
    font-size: 25px;
    margin-bottom: 5px;
  }
  & a {
    text-decoration: none;
    text-align: left;
  }
  &::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-color: #00abe4;
    position: absolute;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover::before {
    transform: scaleX(1);
  }
`;

const FirstImgContainer = styled.div`
  @media (min-width: 768px) {
    border: 2px solid #00abe4;
    height: 400px;
    & img {
      width: 275px;
      height: 400px;
      margin-left: -50px;
      margin-top: -50px;
    }
  }
  @media (max-width: 767.9px) {
    & img {
      display: none;
    }
  }

  display: flex;
  width: 275px;

  margin-right: 10%;
  /* border-radius: 5px; */
  /* background-size: cover; */
  /* /* width: 300px;
  height: 400px; */
`;

const AboutUsTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  padding: 10px;
  margin-top: -5%;
  font-size: 25px;
  line-height: 1.2;
  color: #001117;
  height: fit-content;

  text-justify: inter-word;

  border-radius: 5px;
  @media (min-width: 768px) {
    width: 50%;
    & h1 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    & h2 {
      color: #00abe4;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  @media (max-width: 767.9px) {
    width: 80%;
    & h1 {
      font-size: 15px;
      /* margin-bottom: 10px; */
    }
    & h2 {
      color: #00abe4;
      font-weight: 600;
      /* margin-bottom: 10px; */
    }
  }

  /* border: 1px solid black; */
`;

const AboutUsContainerDiv = styled.div`
  @media (min-width: 768px) {
    margin-top: 75px;
    width: 70%;
    padding-top: 70px;
    height: 100vh;
  }
  @media (max-width: 767.9px) {
    flex-direction: column;
    width: 90%;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
  height: calc(100vh);
`;

export default AboutUs;
