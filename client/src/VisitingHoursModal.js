import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import VistingHoursInputForm from "./VistingHoursInputForm";

const VisitingHoursModal = ({
  setSelectingVisitingHours,
  visitingHoursToBeAdded,
  setVisitingHoursToBeAdded,
  ListingFormInfo,
  setListingFormInfo,
}) => {
  return (
    <VisitingHoursModalContainer>
      <VisitingHoursFormContainer>
        <GrClose
          style={{
            cursor: "pointer",
            scale: "3",
            marginLeft: "25px",
            marginTop: "25px",
            position: "fixed",
          }}
          onClick={() => {
            setSelectingVisitingHours(false);
          }}
        />
        <VistingHoursInputForm
          visitingHoursToBeAdded={visitingHoursToBeAdded}
          setVisitingHoursToBeAdded={setVisitingHoursToBeAdded}
          ListingFormInfo={ListingFormInfo}
          setListingFormInfo={setListingFormInfo}
        />
      </VisitingHoursFormContainer>
    </VisitingHoursModalContainer>
  );
};

const VisitingHoursFormContainer = styled.div`
  position: relative;
  overflow-y: scroll;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 60%;
  height: 80%;
  z-index: 6;
`;
const VisitingHoursModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`;
export default VisitingHoursModal;
