import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const VistingHoursInputForm = ({
  visitingHoursToBeAdded,
  setVisitingHoursToBeAdded,
  ListingFormInfo,
  setListingFormInfo,
}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [dateObject, setDateObject] = useState("");
  const [arr, setArr] = useState([]);

  console.log(ListingFormInfo);
  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          address: ListingFormInfo.listingAddress,
          date: dateObject,
          ownerId: currentUser._id,
          visitorId: "someOtherID",
          isAvailable: true,
          hour: "",
        },
      ];
    });
  };
  console.log(new Date());
  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].hour = e.target.value;

      return newArr;
    });
  };

  return (
    <StyledVisitForm>
      <StyledScheduleInputContainer>
        <p>Please select a date</p>
        <input
          // style={{ width: "70%" }}
          type="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setDateObject(e.target.value);
          }}
        />
      </StyledScheduleInputContainer>
      {dateObject && (
        <StyledScheduleInputContainer>
          <ButtonContainerDiv>
            <p>Add the visiting hours</p>
            <button
              style={{
                height: "35px",
                fontSize: "30px",
                width: "30%",
              }}
              type="button"
              onClick={addInput}
            >
              +
            </button>
          </ButtonContainerDiv>
          <TimeslotInputContainer>
            {arr.map((item, i) => {
              return (
                <>
                  <input
                    onChange={(e) => handleChange(e)}
                    id={i}
                    type={item.type}
                    size="40"
                  />
                </>
              );
            })}
          </TimeslotInputContainer>
        </StyledScheduleInputContainer>
      )}
      <SubmitTimeslotsButton
        // style={{ height: "35px" }}
        arr={arr}
        style={{ height: "35px" }}
        type="button"
        onClick={() => {
          setDateObject(arr);
        }}
      >
        Submit timeslots
      </SubmitTimeslotsButton>
      <SubmitScheduleButton
        type="button"
        dateObject={dateObject}
        onClick={() => {
          setVisitingHoursToBeAdded(() => {
            return [...visitingHoursToBeAdded, ...dateObject];
          });
        }}
      >
        Sumbit Schedule
      </SubmitScheduleButton>
    </StyledVisitForm>
  );
};

const SubmitScheduleButton = styled.button`
  height: 35px;
  width: 50%;
  margin: 0px auto;
  display: ${(props) =>
    typeof props.dateObject === "object" ? "block" : "none"};
`;

const SubmitTimeslotsButton = styled.button`
  height: 35px;
  width: 50%;
  margin: 0px auto 25px auto;
  display: ${(props) => (props.arr.length > 0 ? "block" : "none")};
`;
const ButtonContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeslotInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & input {
    width: 70%;
    margin-bottom: 5px;
  }
`;
export const StyledScheduleInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
  & p {
    color: black;
    font-size: 20px;
    margin-bottom: 10px;
  }
`;
export const StyledVisitForm = styled.div`
  display: flex;
  margin: 8% auto 0px auto;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  height: fit-content;

  & input {
    font-size: 15px;
  }
  & span {
    font-weight: 500;
  }
  /* border: 1px solid red; */
  /* margin-top: 35px; */
`;

export default VistingHoursInputForm;
