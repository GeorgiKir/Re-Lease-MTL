import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const ListingModal = ({ listingInfo, setShowListingModal }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [targetVistingTime, setTargetVisitingTime] = useState({
    visitorId: currentUser._id,
    visitId: "",
    listingId: listingInfo._id,
  });
  const [targetDate, setTargetDate] = useState(null);
  const [targetVisitArray, setTargetVisitArray] = useState(null);

  useEffect(() => {
    fetch(`/timeSlots/ownerId/${listingInfo._id}`)
      .then((res) => res.json())
      .then((data) => {
        let checkIfAlreadyHasVisit = false;
        data.data[0].timeslots.map((item) => {
          if (item.visitorId === currentUser._id) {
            console.log("Already got a visit");
            checkIfAlreadyHasVisit = true;
          }
        });
        if (!checkIfAlreadyHasVisit && data.data.length > 0) {
          setTargetVisitArray(data.data);
        }
      });
  }, []);

  const handleTargetDateChange = (value, name) => {
    setTargetVisitingTime({ ...targetVistingTime, [name]: value });
    setTargetDate(value);
  };

  const handleListingModalSubmit = (e) => {
    e.preventDefault();
    setShowListingModal(false);
    console.log("SUBMITTED");
    fetch(`/listings/reserveAVisitTime`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(targetVistingTime),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData.data);
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
  return (
    <ListingModalContainer>
      <ListingInfoContainer>
        <GrClose
          style={{
            cursor: "pointer",
            scale: "3",
            marginLeft: "25px",
            marginTop: "25px",
          }}
          onClick={() => {
            setShowListingModal(false);
          }}
        />
        <p style={{ marginTop: "15px" }}>
          Address: {listingInfo.listingAddress} {listingInfo.borough}{" "}
          {listingInfo.postalCode}
        </p>
        <p style={{ marginTop: "15px" }}>Price: {listingInfo.price} $</p>
        <p style={{ marginTop: "15px" }}>Bedrooms: {listingInfo.numBDR} </p>
        <p style={{ marginTop: "15px" }}>
          Description: {listingInfo.listingDescription}
        </p>
        {targetVisitArray &&
          targetVistingTime.listingId !== targetVistingTime.visitorId && (
            <form
              onSubmit={(e) => {
                handleListingModalSubmit(e);
              }}
            >
              {targetVisitArray.map((item) => {
                return (
                  <>
                    <p>{item._id}</p>
                    {item.timeslots.map((element) => {
                      if (element.isAvailable) {
                        return (
                          <>
                            <input
                              required
                              type="radio"
                              name="selectedTime"
                              onChange={() => {
                                setTargetVisitingTime({
                                  ...targetVistingTime,
                                  visitId: element._id,
                                });
                              }}
                            />
                            <label>{element.hour}</label>
                          </>
                        );
                      }
                    })}
                  </>
                );
              })}
              <button type="submit">Submit</button>
            </form>
          )}
        {targetVisitArray &&
          targetVistingTime.listingId === targetVistingTime.visitorId && (
            <p>This is your current listing</p>
          )}
      </ListingInfoContainer>
    </ListingModalContainer>
  );
};

const ListingInfoContainer = styled.div`
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  color: black;
  border: 1px solid red;
  background-color: white;
  width: 60%;
  height: 80%;
  z-index: 6;
`;
const ListingModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default ListingModal;
