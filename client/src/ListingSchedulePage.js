import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { ImSpinner } from "react-icons/im";
import { format } from "date-fns";
import { ProfilePageContentDiv } from "./Profile";

const ListingSchedulePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showVisitingHoursInProfile, setShowVisitingHoursInProfile] =
    useState(null);
  const [loadingState, setLoadingState] = useState(null);

  useEffect(() => {
    setLoadingState(true);
    fetch(`/timeSlots/ownerId/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoadingState(false);
        if (data.status === 200) {
          setShowVisitingHoursInProfile(data.data);
        }
      });
  }, []);
  return (
    <div>
      {showVisitingHoursInProfile && (
        <>
          {showVisitingHoursInProfile.map((item) => {
            return (
              <>
                <h1>{item._id}</h1>
                {/* <h1>{format(new Date(item._id), "dd-MM-Y")}</h1> */}
                <div style={{ paddingTop: "5px" }}>
                  {item.timeslots.map((element) => {
                    return (
                      <p style={{ padding: "5px 0px" }}>
                        {element.hour}{" "}
                        {element.isAvailable === true
                          ? "(Available)"
                          : "(Booked)"}
                      </p>
                    );
                  })}
                </div>
              </>
            );
          })}
        </>
      )}
      {!showVisitingHoursInProfile && !loadingState && (
        <p>You currently have no listing.</p>
      )}
      {!showVisitingHoursInProfile && loadingState && <ImSpinner />}
    </div>
  );
};

export default ListingSchedulePage;
