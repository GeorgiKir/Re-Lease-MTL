import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { format } from "date-fns";
import { StyledVisitForm } from "./VistingHoursInputForm";
import { FaRegSadCry } from "react-icons/fa";

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
  const [checkAvailablityOfVisits, setCheckAvailablityOfVisits] =
    useState(false);

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
              if (element.isAvailable) {
                setCheckAvailablityOfVisits(true);
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
        <StyledVisitorForm>
          <GrClose
            style={{
              cursor: "pointer",
              scale: "2",
              marginLeft: "-9%",
              // marginTop: "-1%",
              position: "absolute",
            }}
            onClick={() => {
              setShowListingModal(false);
              setTargetVisitArray(null);
            }}
          />
          <h2>Address:</h2>
          <p>
            {listingInfo.listingAddress} {listingInfo.borough}{" "}
            {listingInfo.postalCode}
          </p>
          <h2>Price:</h2>
          <p>{listingInfo.price} $</p>
          <h2>Bedrooms:</h2>
          <p>{listingInfo.numBDR} bedrooms</p>
          <h2>Description:</h2>
          <p>{listingInfo.listingDescription}</p>
          {targetVisitArray &&
            targetVistingTime.listingId !== targetVistingTime.visitorId &&
            !checkIfAlreadyHasVisit &&
            checkAvailablityOfVisits && (
              <ListingModalForm
                onSubmit={(e) => {
                  handleListingModalSubmit(e);
                }}
              >
                <h1>Visiting Schedule</h1>
                <div>
                  {targetVisitArray.map((item) => {
                    return (
                      <>
                        <h2>{item._id}</h2>
                        <VisitingTimeslotsContainer>
                          {item.timeslots.map((element) => {
                            if (element.isAvailable) {
                              return (
                                <div>
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
                                </div>
                              );
                            }
                          })}
                        </VisitingTimeslotsContainer>
                      </>
                    );
                  })}
                </div>
                <button
                  style={{
                    display: "block",
                    margin: "0px auto",
                    width: "150px",
                    height: "50px",
                    fontSize: "20px",
                  }}
                  type="submit"
                >
                  Submit
                </button>
              </ListingModalForm>
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
          {targetVisitArray &&
            !checkAvailablityOfVisits &&
            !checkIfAlreadyHasVisit && (
              <div
                style={{
                  margin: "0px auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FaRegSadCry
                  style={{
                    fontSize: "40px",
                  }}
                />
                <p>No more available visits</p>
              </div>
            )}
        </StyledVisitorForm>
      </ListingInfoContainer>
    </ListingModalContainer>
  );
};

const VisitingTimeslotsContainer = styled.div`
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  gap: 10px;
`;

const ListingModalForm = styled.form`
  margin-top: 25px;
`;

const StyledVisitorForm = styled.div`
  @media (min-width: 768px) {
    & h1 {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 20px;
    }
    & h2 {
      font-size: 20px;
      font-weight: 500;
      border-bottom: 1px solid gray;
    }
    & p {
      font-size: 15px;
      margin: 15px 0px;
    }
    & label {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
  @media (max-width: 767px) {
    & h1 {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
    }
    & h2 {
      font-size: 15px;
      font-weight: 500;
      border-bottom: 1px solid gray;
    }
    & p {
      font-size: 15px;
      margin: 15px 0px;
    }
    & label {
      font-size: 13px;
      margin-bottom: 0px;
      font-weight: 500;
    }
  }
  display: flex;
  margin: 5% auto;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;
  height: fit-content;
`;

const ListingInfoContainer = styled.div`
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  overflow-y: scroll;
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  color: black;
  border: 1px solid red;
  background-color: white;
  height: 90%;
  z-index: 6;
  & p {
    line-height: 1.3;
  }
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
