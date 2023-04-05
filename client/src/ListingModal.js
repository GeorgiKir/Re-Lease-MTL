import React from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { useState } from "react";

const ListingModal = ({ listingInfo, setShowListingModal }) => {
  const [targetVistingTime, setTargetVisitingTime] = useState({
    listingId: listingInfo._id,
    selectedDate: "",
    selectedTime: "",
  });
  const [targetDate, setTargetDate] = useState(null);
  const [targetVisitArray, setTargetVisitArray] = useState(null);

  const handleTargetDateChange = (value, name) => {
    setTargetVisitingTime({ ...targetVistingTime, [name]: value });
    setTargetDate(value);
    // setTargetVisitArray(listingInfo.visitSchedule[index]);
  };

  const handleListingModalSubmit = (e) => {
    e.preventDefault();
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
          Description: {listingInfo.listingDescription}{" "}
        </p>

        <form
          onSubmit={(e) => {
            handleListingModalSubmit(e);
          }}
        >
          <p>Choose a date: </p>
          <select
            required
            name="selectedDate"
            onChange={(e) => {
              handleTargetDateChange(e.target.value, e.target.name);
            }}
          >
            <option value="" style={{ color: "gray" }}>
              Please Select a date
            </option>
            {listingInfo.visitSchedule.map((item) => {
              return (
                <>
                  <option value={item[0]}>{item[0]}</option>
                </>
              );
            })}
          </select>
          {targetDate !== "" && (
            <>
              {listingInfo.visitSchedule.map((element) => {
                if (element[0] === targetDate) {
                  return (
                    <>
                      {element[1].map((item) => {
                        return (
                          <div style={{ display: "flex" }}>
                            <input
                              required
                              type="radio"
                              name="selectedTime"
                              onChange={() => {
                                setTargetVisitingTime({
                                  ...targetVistingTime,
                                  selectedTime: item,
                                });
                              }}
                            />
                            <label>{item}</label>
                          </div>
                        );
                      })}
                      ;
                    </>
                  );
                }
              })}
            </>
          )}
          <button type="submit">Submit</button>
        </form>
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
  /* justify-content: center; */
  /* align-items: center; */
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
