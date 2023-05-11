import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import DeleteConfirmation from "./DeleteConfirmation";
import SpinnerLoading from "./SpinnerLoading";
const ROOT_API = "https://re-lease-mtl.onrender.com";

const UpcomingVisitsSchedulePage = () => {
  const { t, i18n } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showUpcomingVisits, setShowUpcomingVisits] = useState(null);
  const [visitorHasDeleted, setVisitorHasDeleted] = useState(false);
  const [loadingState, setLoadingState] = useState(null);
  const [targetVisitForDeletion, setTargetVisitForDeletion] = useState(null);
  const [cancelVisitState, setCancelVisitState] = useState(false);

  useEffect(() => {
    setLoadingState(true);
    fetch(`${ROOT_API}/timeSlots/visitorId/${currentUser._id}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status === 200) {
          setShowUpcomingVisits(
            data.data.sort((a, b) => new Date(a._id) - new Date(b._id))
          );
          setLoadingState(false);
        } else if (data.status === 400) {
          setShowUpcomingVisits(null);
          setLoadingState(false);
        }
      });
  }, [visitorHasDeleted]);

  const handleTimeslotDeleteByVisitor = (visitId) => {
    fetch(`${ROOT_API}/timeSlots/deleteTimeSlot/${visitId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setVisitorHasDeleted(!visitorHasDeleted);
      });
  };

  return (
    <div>
      {showUpcomingVisits && (
        <>
          {showUpcomingVisits.map((item) => {
            return (
              <>
                <h1>{item._id}</h1>
                <div style={{ paddingTop: "5px" }}>
                  {item.timeslots.map((element, index) => {
                    return (
                      <UpcomingVisitContainer>
                        <>
                          <p>
                            {element.address}: {element.hour}{" "}
                          </p>
                          <FiTrash2
                            onClick={(e) => {
                              setTargetVisitForDeletion(element._id);
                              setCancelVisitState(true);
                            }}
                          />
                          {cancelVisitState && (
                            <DeleteConfirmation
                              elementId={targetVisitForDeletion}
                              cancelVisitState={cancelVisitState}
                              setCancelVisitState={setCancelVisitState}
                              handleTimeslotDeleteByVisitor={
                                handleTimeslotDeleteByVisitor
                              }
                            />
                          )}
                        </>
                      </UpcomingVisitContainer>
                    );
                  })}
                </div>
              </>
            );
          })}
        </>
      )}
      {!showUpcomingVisits && !loadingState && (
        <p style={{ textAlign: "center" }}>
          {t("profileHeader.noVisitsToShow")}
        </p>
      )}
      {!showUpcomingVisits && loadingState && <SpinnerLoading />}
    </div>
  );
};

const UpcomingVisitContainer = styled.div`
  @media (min-width: 768px) {
    width: 60%;
    & p {
      margin: 0px;
      font-size: 20px;
    }
  }

  @media (max-width: 767px) {
    width: 85%;
    margin-bottom: 10px;
    & p {
      margin: 0px;
      font-size: 15px;
    }
  }
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  /* border: 1px solid black; */
  border-radius: 5px;
  margin: 5px auto 0px auto;
  & svg {
    cursor: pointer;
    font-size: 25px;
    &:hover {
      scale: 1.5;
      color: #00abe4;
    }
  }
`;

export default UpcomingVisitsSchedulePage;
