import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const ListingSchedulePage = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showVisitingHoursInProfile, setShowVisitingHoursInProfile] =
    useState(null);

  useEffect(() => {
    fetch(`/timeSlots/ownerId/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setShowVisitingHoursInProfile(data.data);
        }
      });
  }, []);
  return (
    <div>
      ListingSchedulePage
      {showVisitingHoursInProfile && (
        <>
          {showVisitingHoursInProfile.map((item) => {
            return (
              <>
                <p>{item._id}</p>
                {item.timeslots.map((element) => {
                  return (
                    <p>
                      {element.hour}{" "}
                      <span>
                        {element.isAvailable === true ? "Available" : "Booked"}
                      </span>
                    </p>
                  );
                })}
              </>
            );
          })}
        </>
      )}
      {!showVisitingHoursInProfile && <p>You currently have no listing.</p>}
    </div>
  );
};

export default ListingSchedulePage;
