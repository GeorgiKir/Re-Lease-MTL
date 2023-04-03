import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

const VisitingHoursModal = ({ setSelectingVisitingHours }) => {
  return (
    <VisitingHoursModalContainer>
      <VisitingHoursFormContainer>
        <GrClose
          style={{
            cursor: "pointer",
            scale: "3",
            marginLeft: "25px",
            marginTop: "25px",
          }}
          onClick={() => {
            setSelectingVisitingHours(false);
          }}
        />
      </VisitingHoursFormContainer>
    </VisitingHoursModalContainer>
  );
};

const VisitingHoursFormContainer = styled.div`
  position: relative;
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
