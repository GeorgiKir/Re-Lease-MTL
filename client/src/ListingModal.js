import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { format } from "date-fns";
import { StyledVisitForm } from "./VistingHoursInputForm";

const ListingModal = ({ listingInfo, setShowListingModal }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [targetVistingTime, setTargetVisitingTime] = useState({
    visitorId: currentUser._id,
    visitId: "",
    listingId: listingInfo._id,
  });
  const [targetDate, setTargetDate] = useState(null);
  const [targetVisitArray, setTargetVisitArray] = useState(null);
  const [checkIfAlreadyHasVisit, setCheckifAlreadyHasVisit] = useState(false);

  useEffect(() => {
    fetch(`/timeSlots/ownerId/${listingInfo._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setTargetVisitArray(data.data);

          data.data.forEach((item) => {
            item.timeslots.map((element) => {
              if (element.visitorId === currentUser._id) {
                setCheckifAlreadyHasVisit(true);
              }
            });
          });
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
    setTargetVisitArray(null);
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
            position: "fixed",
          }}
          onClick={() => {
            setShowListingModal(false);
            setTargetVisitArray(null);
          }}
        />
        <StyledVisitorForm>
          <h2>Address:</h2>
          <p style={{ marginTop: "15px" }}>
            {listingInfo.listingAddress} {listingInfo.borough}{" "}
            {listingInfo.postalCode}
          </p>
          <h2>Price:</h2>
          <p style={{ marginTop: "15px" }}>{listingInfo.price} $</p>
          <h2>Bedrooms:</h2>
          <p style={{ marginTop: "15px" }}>{listingInfo.numBDR} bedrooms</p>
          <h2>Description:</h2>
          <p style={{ marginTop: "15px" }}>{listingInfo.listingDescription}</p>
          {targetVisitArray &&
            targetVistingTime.listingId !== targetVistingTime.visitorId &&
            !checkIfAlreadyHasVisit && (
              <form
                onSubmit={(e) => {
                  handleListingModalSubmit(e);
                }}
              >
                {targetVisitArray.map((item) => {
                  return (
                    <>
                      <h1>{item._id}</h1>
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
          {targetVisitArray &&
            targetVistingTime.listingId !== targetVistingTime.visitorId &&
            checkIfAlreadyHasVisit && (
              <p>You already have a visit at this address</p>
            )}
        </StyledVisitorForm>
      </ListingInfoContainer>
    </ListingModalContainer>
  );
};

const StyledVisitorForm = styled.div`
  display: flex;
  margin: 8% auto 0px auto;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  height: fit-content;
  & h2 {
    /* font-weight: 500; */
    /* border: 1px solid red; */
    border-bottom: 1px solid gray;
  }
  & p {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
    text-align: center;
  }
`;

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
