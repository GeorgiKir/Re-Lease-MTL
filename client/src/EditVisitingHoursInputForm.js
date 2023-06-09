import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { SubmitTimeslotsButton } from "./VistingHoursInputForm";
const ROOT_API = "https://re-lease-mtl.onrender.com";

const EditVistingHoursInputForm = ({
  listingUserHasDeleted,
  setListingUserHasDeleted,
  setShowEditModal,
}) => {
  const { t, i18n } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [dateObject, setDateObject] = useState("");
  const [arr, setArr] = useState([]);
  const [errMessage, setErrMessage] = useState(null);

  const handleEditedVisitingHoursSubmit = (e) => {
    e.preventDefault();

    fetch(`${ROOT_API}/timeSlots/addTimeSlots`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ selectedTimeSlots: dateObject }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === 200) {
          setErrMessage(resData.data);
          setListingUserHasDeleted(!listingUserHasDeleted);
          setTimeout(() => {
            setShowEditModal(false);
          }, "1500");
        }
      });
  };

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          address: currentUser.listing.listingAddress,
          date: dateObject,
          ownerId: currentUser._id,
          visitorId: null,
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
    <StyledVisitForm
      onSubmit={(e) => {
        handleEditedVisitingHoursSubmit(e);
      }}
    >
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
      {errMessage && (
        <p
          style={{
            color: "#00abe4",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          {errMessage}
        </p>
      )}
      <SubmitTimeslotsButton
        arr={arr}
        style={{ height: "35px" }}
        type="submit"
        onClick={() => {
          setDateObject(arr);
        }}
      >
        {t("form.submitSchedule")}
      </SubmitTimeslotsButton>
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
// const SubmitScheduleButton = styled.button`
//   height: 35px;
//   width: 50%;
//   margin: 0px auto;
//   display: ${(props) =>
//     typeof props.dateObject === "object" ? "block" : "none"};
// `;

// const SubmitTimeslotsButton = styled.button`
//   height: 35px;
//   width: 30%;
//   margin: 0px auto 25px auto;
//   display: ${(props) => (props.arr.length > 0 ? "block" : "none")};
// `;
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
    width: 75%;
    line-height: 1.5;
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
export const StyledVisitForm = styled.form`
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

export default EditVistingHoursInputForm;
