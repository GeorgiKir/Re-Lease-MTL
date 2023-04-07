import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

const UpcomingVisitsSchedulePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showUpcomingVisits, setShowUpcomingVisits] = useState(null);
  const [visitorHasDeleted, setVisitorHasDeleted] = useState(false);
  useEffect(() => {
    fetch(`/timeSlots/visitorId/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("upcoming visits has re-rendered", data);
        if (data.status === 200) {
          setShowUpcomingVisits(data.data);
        } else if (data.status === 400) {
          setShowUpcomingVisits(null);
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
      <p>UpcomingVisitsSchedulePage</p>
      {showUpcomingVisits && (
        <>
          {console.log(showUpcomingVisits)}
          {showUpcomingVisits.map((item) => {
            return (
              <>
                <p>{item._id}</p>
                {item.timeslots.map((element, index) => {
                  return (
                    <UpcomingVisitContainer>
                      <p>
                        {element.address} : {element.hour}{" "}
                      </p>
                      <GrClose
                        style={{ border: "1px solid red", cursor: "pointer" }}
                        onClick={(e) => {
                          handleTimeslotDeleteByVisitor(e, element._id, index);
                        }}
                      />
                    </UpcomingVisitContainer>
                  );
                })}
              </>
            );
          })}
        </>
      )}
      {!showUpcomingVisits && <p>No Visits to show</p>}
    </div>
  );
  // SIMILAR STUFF TO LISTINGSCHEDULEPAGE
  // ADD DELETION OF SINGLE VISIT (WITH AN X BUTTON)
};

const UpcomingVisitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid black;
`;

export default UpcomingVisitsSchedulePage;
