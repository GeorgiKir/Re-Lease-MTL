import React from "react";
import styled from "styled-components";
import gearImg from "./assets/gear_img.png";
import { keyframes } from "styled-components";
const ProcessingPage = () => {
  return (
    <ProcessingStyledDiv>
      <StyledImg src={gearImg} />
      <p style={{ fontSize: "40px", marginTop: "30px" }}>Processing...</p>
    </ProcessingStyledDiv>
  );
};

const SpinnerAnimation = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const StyledImg = styled.img`
  animation: ${SpinnerAnimation} 3.5s linear infinite;
`;
const ProcessingStyledDiv = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & img {
    width: 20%;
  }
`;
export default ProcessingPage;
