import React from "react";
import styled from "styled-components";
import blueBgImg from "./assets/blue_bg.jpg";
import movingImg from "./assets/moving1.jpg";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const AboutUs = () => {
  return (
    <AboutUsContainerDiv id="about">
      <FirstImgContainer>
        <img src={movingImg} />
      </FirstImgContainer>
      <AboutUsTextDiv>
        <h2>Lease assignment made easy with our platform.</h2>
        <h1>
          Whether you're a tenant looking to assign your lease or a renter in
          need of an apartment, we've got you covered.
        </h1>
        <h1>
          Our user-friendly website connects renters with reliable tenants,
          streamlining the assignment process. List your space or find your
          perfect apartment today.
        </h1>
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
          <h2 style={{ margin: "0px", padding: "0px" }}>
            Assigning a Lease VS Subletting?
          </h2>
          <SlArrowRight
            style={{
              color: "#00abe4",
              fontSize: "25px",
              marginLeft: "10px",
              padding: "5px",
              //   border: "1px solid red",
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
            // border: "1px solid black",
          }}
        >
          <h2 style={{ margin: "0px", padding: "0px" }}>Our Process</h2>
          <SlArrowRight
            style={{
              color: "#00abe4",
              fontSize: "25px",
              marginLeft: "10px",
              padding: "5px",
              //   border: "1px solid red",
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
      font-size: 25px;
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
    width: 70%;
    padding-top: "70px";
    height: calc(100vh);
  }
  @media (max-width: 767.9px) {
    flex-direction: column;
    width: 90%;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
  height: calc(100vh - 50px);
`;

export default AboutUs;
