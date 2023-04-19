import React from "react";
import styled from "styled-components";
import { PreviousNextButtonDiv } from "./ListingCreationForm";
import { ImWarning } from "react-icons/im";
const DeleteConfirmation = ({
  elementId,
  setCancelVisitState,
  handleTimeslotDeleteByVisitor,
  handleListingDelete,
}) => {
  return (
    <DeleteModalContainer>
      <DeleteInfoContainer>
        <ImWarning style={{ fontSize: "35px", color: "red" }} />
        {handleTimeslotDeleteByVisitor && (
          <p>This will permanently delete your visit</p>
        )}
        {handleListingDelete && (
          <p>This will permanently delete your listing</p>
        )}
        <PreviousNextButtonDiv>
          <button
            onClick={() => {
              setCancelVisitState(false);
            }}
          >
            Cancel
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
            Confirm
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
