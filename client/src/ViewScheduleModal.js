import React from "react";
import styled from "styled-components";
import { CommentInfoContainer, CommentModalContainer } from "./CommentsModal";
import { GrClose } from "react-icons/gr";

const ViewScheduleModal = ({ setToggleViewVisitHours, selectedTimeSlots }) => {
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
        <div>
          <p>ViewScheduleModal</p>
          {selectedTimeSlots && selectedTimeSlots.length > 0 && (
            <>
              {selectedTimeSlots.map((item) => {
                console.log(item);
                return (
                  <p>item</p>

                  //   <>
                  //     <h1>{item._id}</h1>
                  //     <div style={{ paddingTop: "5px" }}>
                  //       {item.timeslots.map((element) => {
                  //         return (
                  //           <div
                  //             style={{
                  //               display: "flex",
                  //               justifyContent: "center",
                  //             }}
                  //           >
                  //             <p
                  //               style={{
                  //                 padding: "5px 0px",
                  //                 width: "fit-content",
                  //               }}
                  //             >
                  //               {element.hour}{" "}
                  //               {element.isAvailable === true
                  //                 ? "(Available)"
                  //                 : "(Booked)"}
                  //             </p>
                  //           </div>
                  //         );
                  //       })}
                  //     </div>
                  //   </>
                );
              })}
            </>
          )}
          {!selectedTimeSlots ||
            (selectedTimeSlots.length <= 0 && <p>No visits...hmm....</p>)}
        </div>
      </CommentInfoContainer>
    </CommentModalContainer>
  );
};

export default ViewScheduleModal;
