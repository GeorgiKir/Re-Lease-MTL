import React from "react";
import { GrClose } from "react-icons/gr";
import styled from "styled-components";
import EditVistingHoursInputForm from "./EditVisitingHoursInputForm";

const EditVisitingHoursModal = ({
  setShowEditModal,
  listingUserHasDeleted,
  setListingUserHasDeleted,
}) => {
  //   const [visitingHoursToBeAdded, setVisitingHoursToBeAdded] = useState([]);
  return (
    <VisitingHoursModalContainer>
      <VisitingHoursFormContainer>
        <StyledCloseIcon
          onClick={() => {
            setShowEditModal(false);
          }}
        />
        <EditVistingHoursInputForm
          listingUserHasDeleted={listingUserHasDeleted}
          setListingUserHasDeleted={setListingUserHasDeleted}
          setShowEditModal={setShowEditModal}
        />
      </VisitingHoursFormContainer>
    </VisitingHoursModalContainer>
  );
};
const StyledCloseIcon = styled(GrClose)`
  @media (min-width: 768px) {
    margin-left: 10px;
    margin-top: 15px;
    position: fixed;
    font-size: 35px;
  }
  @media (max-width: 767px) {
    margin-left: 10px;
    margin-top: 15px;
    position: fixed;
    font-size: 25px;
  }
  cursor: "pointer";
`;
const VisitingHoursFormContainer = styled.div`
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  position: relative;
  overflow-y: scroll;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
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
export default EditVisitingHoursModal;
