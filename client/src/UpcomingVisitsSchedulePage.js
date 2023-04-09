import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { ImSpinner } from "react-icons/im";
import { format } from "date-fns";

const UpcomingVisitsSchedulePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showUpcomingVisits, setShowUpcomingVisits] = useState(null);
  const [visitorHasDeleted, setVisitorHasDeleted] = useState(false);
  const [loadingState, setLoadingState] = useState(null);

  useEffect(() => {
    setLoadingState(true);
    fetch(`/timeSlots/visitorId/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setShowUpcomingVisits(data.data.sort((a, b) => a._id - b._id));
          setLoadingState(false);
        } else if (data.status === 400) {
          setShowUpcomingVisits(null);
          setLoadingState(false);
        }
      });
  }, [visitorHasDeleted]);

  const handleTimeslotDeleteByVisitor = (e, visitId, index) => {
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
                            {element.address} : {element.hour}{" "}
                          </p>
                          <GrClose
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleTimeslotDeleteByVisitor(
                                e,
                                element._id,
                                index
                              );
                            }}
                          />
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
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 40%;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px auto 0px auto;
  & p {
    margin: 0px;
  }
`;

export default UpcomingVisitsSchedulePage;
