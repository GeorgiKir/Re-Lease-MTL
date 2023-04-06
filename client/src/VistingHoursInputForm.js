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
  // const inputArr = [""];
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [dateObject, setDateObject] = useState("");
  const [arr, setArr] = useState([]);
  // let targetDate = dateObject[0];
  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
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
      <input
        type="date"
        onChange={(e) => {
          //   targetDate = e.target.value;
          setDateObject(e.target.value);
        }}
      />
      <button type="button" onClick={addInput}>
        +
      </button>
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
      <button
        type="button"
        onClick={() => {
          setDateObject(arr);
        }}
      >
        Submit
      </button>
      <button
        type="button"
        onClick={() => {
          setVisitingHoursToBeAdded(() => {
            // return [...visitingHoursToBeAdded, dateObject];
            return [...visitingHoursToBeAdded, ...dateObject];
          });
          // setListingFormInfo({
          //   ...ListingFormInfo,
          //   visitSchedule: visitingHoursToBeAdded,
          // });
        }}
      >
        Sumbit Schedule
      </button>
    </StyledVisitForm>
  );
};

const StyledVisitForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid red;
  margin-top: 35px;
`;

export default VistingHoursInputForm;
