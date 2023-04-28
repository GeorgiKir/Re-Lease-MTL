import React from "react";
import styled from "styled-components";
import { CommentInfoContainer, CommentModalContainer } from "./CommentsModal";
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from "react";

const ViewScheduleModal = ({ setToggleViewVisitHours, selectedTimeSlots }) => {
  const [groupedSchedule, setGroupedSchedule] = useState([]);

  const groupByValue = (obj) => {
    const newScheduleArray = Object.values(obj);
    let reverseObj = newScheduleArray.reduce(
      (previousStage, currentNameValue) => {
        let targetKey = currentNameValue.date;

        let list = previousStage[targetKey];
        if (!list) {
          previousStage[targetKey] = list = [];
        }
        list.push(currentNameValue.hour);
        return previousStage;
      },
      {}
    );
    return reverseObj;
  };
  useEffect(() => {
    setGroupedSchedule([groupByValue(selectedTimeSlots)]);
  }, []);

  return (
    <CommentModalContainer>
      <CommentInfoContainer>
        <GrClose
          style={{
            cursor: "pointer",
            fontSize: "35px",
            position: "absolute",
          }}
          onClick={() => {
            setToggleViewVisitHours(false);
          }}
        />

        <TimeSlotPreviewContainer>
          {!selectedTimeSlots ||
            (selectedTimeSlots.length <= 0 && <p>No visits...hmm....</p>)}
          {groupedSchedule && groupedSchedule.length > 0 && (
            <>
              {Object.keys(groupedSchedule[0]).map((item) => {
                return (
                  <IndividualTimeSlotDiv>
                    <h1>{item}</h1>
                    {groupedSchedule[0][item].map((time) => {
                      return <p>- {time} -</p>;
                    })}
                  </IndividualTimeSlotDiv>
                );
              })}
            </>
          )}
        </TimeSlotPreviewContainer>
      </CommentInfoContainer>
    </CommentModalContainer>
  );
};

const IndividualTimeSlotDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 45%;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #faf9f6;
  border: 1px solid #009acd;
  padding: 5px;
  & h1 {
    color: #0078a0;
  }
  & p {
    color: #00445b;
    margin-bottom: 2px;
  }
`;

const TimeSlotPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5%;
  flex-wrap: wrap;
  padding: 50px 25px;
`;
export default ViewScheduleModal;
