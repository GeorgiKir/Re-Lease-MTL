import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <p>RE:lease MTL Copyright</p>
      </StyledFooter>
    </>
  );
};

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* width: 98.9vw; */
  background-color: black;
  height: 50px;
  color: white;
  bottom: 0;
  /* margin-top: auto; */
`;

export default Footer;
