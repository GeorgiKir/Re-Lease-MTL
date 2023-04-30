import React from "react";
import styled, { keyframes } from "styled-components";
import { ImSpinner, ImSpinner9 } from "react-icons/im";

const SpinnerLoading = () => {
  return (
    <Spinner>
      <ImSpinner9 style={{ fontSize: "50px", color: "#00abe4" }} />
    </Spinner>
  );
};

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 1.75s linear infinite;
  margin: 20vh auto;
  scale: 1.5;
`;

export default SpinnerLoading;
