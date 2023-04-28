import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { Trans, useTranslation } from "react-i18next";

const VistingHoursInputForm = ({
  visitingHoursToBeAdded,
  setVisitingHoursToBeAdded,
  ListingFormInfo,
  setListingFormInfo,
  setSelectingVisitingHours,
  setListingCreationTracker,
}) => {
  const { t, i18n } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [dateObject, setDateObject] = useState("");
  const [arr, setArr] = useState([]);

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
        <p>{t("form.selectDate")}</p>
        <input
          style={{ width: "250px" }}
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
            <StyledAddHoursButton type="button" onClick={addInput}>
              {t("form.addTimeslot")}
            </StyledAddHoursButton>
          </ButtonContainerDiv>
          <TimeslotInputContainer>
            {arr.map((item, i) => {
              return (
                <>
                  <input
                    required
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
        arr={arr}
        style={{ height: "35px" }}
        type="button"
        onClick={() => {
          setDateObject(
            arr.filter((item) => {
              if (item.hour.length > 0) {
                return item;
              }
            })
          );
        }}
      >
        {t("form.submitTimeslots")}
      </SubmitTimeslotsButton>
      <SubmitScheduleButton
        type="button"
        dateObject={dateObject}
        onClick={() => {
          setVisitingHoursToBeAdded(() => {
            setSelectingVisitingHours(false);
            setListingCreationTracker(4);
            return [...visitingHoursToBeAdded, ...dateObject];
          });
          setListingFormInfo({
            ...ListingFormInfo,
            selectedTimeSlots: [
              ...ListingFormInfo.selectedTimeSlots,
              ...dateObject,
            ],
          });
        }}
      >
        {t("form.submitSchedule")}
      </SubmitScheduleButton>
    </StyledVisitForm>
  );
};

const StyledAddHoursButton = styled.button`
  @media (min-width: 768px) {
    width: 150px;
    font-size: 20px;
    padding: 10px 10px;
  }
  @media (max-width: 767px) {
    width: 75px;
    font-size: 15px;
    padding: 10px 10px;
  }
  cursor: pointer;
  background-color: #467abf;
  border: none;
  border-radius: 5px;
  color: white;
`;
const SubmitScheduleButton = styled.button`
  width: 40%;
  margin: 0px auto;
  display: ${(props) =>
    typeof props.dateObject === "object" ? "block" : "none"};
  @media (min-width: 1135px) {
    font-size: 20px;
  }
  @media (max-width: 1135px) {
    font-size: 15px;
  }

  font-family: "Jost", sans-serif;
  position: relative;
  z-index: 1;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid #0078a0;
  gap: 5px;
  padding: 0px 10px;
  cursor: pointer;
  color: #0078a0;

  &:hover,
  :focus {
    color: white;
  }
  &::before {
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-color: #0078a0;
    position: absolute;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;

const SubmitTimeslotsButton = styled.button`
  width: 40%;
  margin: 0px auto 25px auto;
  display: ${(props) => (props.arr.length > 0 ? "block" : "none")};
  @media (min-width: 1135px) {
    font-size: 20px;
  }
  @media (max-width: 1135px) {
    font-size: 15px;
  }

  font-family: "Jost", sans-serif;
  position: relative;
  z-index: 1;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid #0078a0;
  gap: 5px;
  padding: 0px 10px;
  cursor: pointer;
  color: #0078a0;

  &:hover,
  :focus {
    color: white;
  }
  &::before {
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-color: #0078a0;
    position: absolute;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;
const ButtonContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10%;
  width: 50%;
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
  @media (min-width: 768px) {
    & p {
      text-align: start;
      color: black;
      font-size: 20px;
    }
  }
  @media (max-width: 767px) {
    & p {
      text-align: start;
      color: black;
      font-size: 15px;
    }
  }
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
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
