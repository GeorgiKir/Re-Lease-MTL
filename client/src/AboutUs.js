import React from "react";
import { useTranslation } from "react-i18next";
import { SlArrowRight } from "react-icons/sl";
import styled from "styled-components";
import movingImg from "./assets/moving1.jpg";

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
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AboutUsLinkButton style={{ margin: "0px", padding: "0px" }}>
            <a
              target="_blank"
              href="https://www.tal.gouv.qc.ca/en/assignment-of-a-lease-or-subleasing/assignment-of-lease-agreement-and-notice-to-sublet-the-dwelling"
            >
              <p>{t("aboutUs.link1")}</p>
            </a>{" "}
            <SlArrowRight
              style={{
                color: "#00abe4",
                fontSize: "25px",
                marginLeft: "10px",
                padding: "5px",
              }}
            />
          </AboutUsLinkButton>
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
            <a href="#process">
              <p>{t("aboutUs.link2")}</p>
            </a>{" "}
            <SlArrowRight
              style={{
                color: "#00abe4",
                fontSize: "25px",
                marginLeft: "10px",
                padding: "5px",
              }}
            />
          </AboutUsLinkButton>
        </div>
      </AboutUsTextDiv>
    </AboutUsContainerDiv>
  );
};

const AboutUsLinkButton = styled.button`
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  gap: 5px;
  height: fit-content;
  margin-top: 5%;
  align-items: center;
  & p {
    font-family: "Montserrat", sans-serif;
    color: #00abe4;
    font-weight: 600;
    font-size: 25px;
    margin-bottom: 5px;
    text-align: left;
  }
  & a {
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
    color: #00abe4;
    font-weight: 600;
    font-size: 25px;
    margin-bottom: 5px;
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
  &:focus {
    transform: scaleX(0);
  }
`;

const FirstImgContainer = styled.div`
  @media (min-width: 768px) {
    border: 2px solid #00abe4;
    height: 400px;
    border-radius: 5px;
    & img {
      border-radius: 5px;
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
  margin: 30px auto;
  height: fit-content;
`;

export default AboutUs;
