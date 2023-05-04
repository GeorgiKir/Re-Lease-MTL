import React from "react";
import { useTranslation } from "react-i18next";
import { ImWarning } from "react-icons/im";
import styled from "styled-components";
import { ProfileStyledButton } from "./Profile";

const ErrorFormModal = ({ errorMessage, setErrorMessage }) => {
  const { t, i18n } = useTranslation();
  return (
    <DeleteModalContainer>
      <DeleteInfoContainer>
        <ImWarning style={{ fontSize: "35px", color: "red" }} />
        <p>{errorMessage}</p>
        <ProfileStyledButton
          style={{ fontSize: "20px" }}
          onClick={() => {
            setErrorMessage(null);
          }}
        >
          OK
        </ProfileStyledButton>
      </DeleteInfoContainer>
    </DeleteModalContainer>
  );
};

const DeleteInfoContainer = styled.div`
  @media (min-width: 768px) {
    width: 40%;
    & p {
      font-size: 20px;
    }
  }
  @media (max-width: 767px) {
    width: 70%;
    & p {
      font-size: 18px;
    }
  }
  /* overflow-y: scroll; */
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: black;
  background-color: white;
  height: 20%;
  z-index: 6;
  border: 3px solid #0078a0;
  & p {
    text-align: center;
  }
`;
const DeleteModalContainer = styled.div`
  height: 100vh;
  /* height: calc(100% + 200px); */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
`;

export default ErrorFormModal;
