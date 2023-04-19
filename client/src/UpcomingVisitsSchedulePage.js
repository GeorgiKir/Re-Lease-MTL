import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { FiTrash2 } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { format } from "date-fns";
import DeleteConfirmation from "./DeleteConfirmation";

const UpcomingVisitsSchedulePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showUpcomingVisits, setShowUpcomingVisits] = useState(null);
  const [visitorHasDeleted, setVisitorHasDeleted] = useState(false);
  const [loadingState, setLoadingState] = useState(null);
  const [targetVisitForDeletion, setTargetVisitForDeletion] = useState(null);
  const [cancelVisitState, setCancelVisitState] = useState(false);

  useEffect(() => {
    setLoadingState(true);
    fetch(`/timeSlots/visitorId/${currentUser._id}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.status === 200) {
          // console.log(data.data);
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
    fetch(`/timeSlots/deleteTimeSlot/${visitId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setVisitorHasDeleted(!visitorHasDeleted);
      });
  };

  return (
    <div>
      {showUpcomingVisits && (
        <>
          {/* {console.log(showUpcomingVisits)} */}
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
                            style={{ cursor: "pointer", fontSize: "25px" }}
                            onClick={(e) => {
                              console.log(element._id);
                              setTargetVisitForDeletion(element._id);
                              setCancelVisitState(true);
                              // handleTimeslotDeleteByVisitor(
                              //   element._id,
                              // );
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
      {!showUpcomingVisits && !loadingState && <p>No Visits to show</p>}
      {!showUpcomingVisits && loadingState && <ImSpinner />}
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
    width: 50%;
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
`;

export default UpcomingVisitsSchedulePage;
