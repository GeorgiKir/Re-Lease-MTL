import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <p>RE:lease MTL Copyright - 2023</p>
      </StyledFooter>
    </>
  );
};

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: #0078a0;

  height: 50px;
  color: white;
`;

export default Footer;
