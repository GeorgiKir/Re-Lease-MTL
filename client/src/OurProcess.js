import React from "react";
import { useTranslation } from "react-i18next";
import { SlArrowRight } from "react-icons/sl";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import styled from "styled-components";
import handshakeImg from "./assets/handshake1.jpg";
import { useState } from "react";

const OurProcess = () => {
  const [showDescription, setShowDescription] = useState(null);
  const { t, i18n } = useTranslation();
  return (
    <AboutUsContainerDiv id="process">
      <AboutUsTextDiv>
        <h2>{t("process.title")}</h2>
        <IndividualStepContainer
        // onMouseEnter={() => {
        //   setShowDescription(1);
        // }}
        // onMouseLeave={() => {
        //   setShowDescription(null);
        // }}
        >
          <MainTextStepDiv>
            <h1 style={{ marginLeft: "2%" }}>{t("process.text1")}</h1>
            {/* <MdOutlineKeyboardArrowDown style={{ fontSize: "30px" }} /> */}
          </MainTextStepDiv>
          {showDescription === 1 && <p>ACCOUNT CREATION</p>}
        </IndividualStepContainer>
        <IndividualStepContainer>
          <MainTextStepDiv>
            <h1 style={{ marginLeft: "4%" }}>{t("process.text2")}</h1>
            {/* <MdOutlineKeyboardArrowDown style={{ fontSize: "30px" }} /> */}
          </MainTextStepDiv>
        </IndividualStepContainer>
        <IndividualStepContainer>
          <MainTextStepDiv>
            <h1 style={{ marginLeft: "6%" }}>{t("process.text3")}</h1>
          </MainTextStepDiv>
        </IndividualStepContainer>
        <IndividualStepContainer>
          <MainTextStepDiv>
            <h1 style={{ marginLeft: "8%" }}>{t("process.text4")}</h1>
          </MainTextStepDiv>
        </IndividualStepContainer>
        <IndividualStepContainer>
          <MainTextStepDiv>
            <h1 style={{ marginLeft: "10%" }}>{t("process.text5")}</h1>
          </MainTextStepDiv>
        </IndividualStepContainer>

        <IndividualStepContainer>
          <MainTextStepDiv>
            <h1
              style={{ marginLeft: "12%", color: "#00abe4", fontWeight: "500" }}
            >
              {t("process.text6")}
            </h1>
            {/* <MdOutlineKeyboardArrowDown style={{ fontSize: "30px" }} /> */}
          </MainTextStepDiv>
        </IndividualStepContainer>
      </AboutUsTextDiv>
      <FirstImgContainer>
        <img src={handshakeImg} />
      </FirstImgContainer>
    </AboutUsContainerDiv>
  );
};

const MainTextStepDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  justify-content: space-between;
`;
const IndividualStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

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
    border-radius: 5px;
    height: 400px;
    & img {
      width: 275px;
      height: 400px;
      margin-left: 50px;
      margin-top: 50px;
      border-radius: 5px;
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
  height: 50%;
  text-justify: inter-word;
  border-radius: 5px;
  @media (min-width: 768px) {
    width: 50%;
    & h1 {
      font-size: 25px;
      /* margin-bottom: 10px; */
    }
    & h2 {
      color: #00abe4;
      font-weight: 600;
      margin-bottom: 20px;
    }
  }
  @media (max-width: 767.9px) {
    width: 80%;
    & h1 {
      font-size: 20px;
      /* margin-bottom: 10px; */
    }
    & h2 {
      color: #00abe4;
      font-weight: 600;
      margin-bottom: 30px;
    }
  }

  /* border: 1px solid black; */
`;

const AboutUsContainerDiv = styled.div`
  @media (min-width: 768px) {
    /* margin-top: 75px; */
    width: 80%;
    /* padding-top: 70px; */
    height: 100vh;
  }
  @media (max-width: 767.9px) {
    flex-direction: column;
    width: 90%;
  }
  /* padding-top: 150px; */
  scroll-margin: 55px;
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
  height: 100vh;
`;

export default OurProcess;
