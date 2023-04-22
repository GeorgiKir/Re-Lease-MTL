import React from "react";
import styled from "styled-components";
import { PreviousNextButtonDiv } from "./ListingCreationForm";
import { ImWarning } from "react-icons/im";
import { Trans, useTranslation } from "react-i18next";

const DeleteConfirmation = ({
  elementId,
  setCancelVisitState,
  handleTimeslotDeleteByVisitor,
  handleListingDelete,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <DeleteModalContainer>
      <DeleteInfoContainer>
        <ImWarning style={{ fontSize: "35px", color: "red" }} />
        {handleTimeslotDeleteByVisitor && (
          <p>{t("deleteConfirmation.deleteVisit")}</p>
        )}
        {handleListingDelete && <p>{t("deleteConfirmation.deleteListing")}</p>}
        <PreviousNextButtonDiv>
          <button
            onClick={() => {
              setCancelVisitState(false);
            }}
          >
            {t("buttons.cancel")}
          </button>
          <button
            onClick={() => {
              if (handleTimeslotDeleteByVisitor) {
                handleTimeslotDeleteByVisitor(elementId);
              } else if (handleListingDelete) {
                handleListingDelete();
              }
              setCancelVisitState(false);
            }}
          >
            {t("buttons.confirm")}
          </button>
        </PreviousNextButtonDiv>
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
    width: 90%;
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
  height: 30%;
  z-index: 6;
  border: 3px solid #0078a0;
`;
const DeleteModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
`;

export default DeleteConfirmation;
