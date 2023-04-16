import React from "react";
import styled from "styled-components";
import exitImg from "./assets/exit_img.png";

const LogoutPage = () => {
  return (
    <LogoutPageDiv>
      <img src={exitImg} />
      <p>Logging Out...</p>
    </LogoutPageDiv>
  );
};

const LogoutPageDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  & img {
    width: 20%;
    margin-bottom: 50px;
  }
`;
export default LogoutPage;
