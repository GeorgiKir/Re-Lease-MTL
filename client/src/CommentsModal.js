import React, { useState } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const CommentsModal = ({
  myListing,
  selectedElement,
  setShowCommentModal,
  setSelectedElement,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [showReplyState, setShowReplyState] = useState(false);
  const [commentorUsername, setCommentorUsername] = useState(null);
  const [commentFormObject, setCommentFormObject] = useState({
    listingId: selectedElement._id,
    comment: null,
    reply: null,
    commentId: null,
    username: currentUser.nickname,
  });

  console.log(selectedElement);

  const handleCommentSubmit = (e, comment, type) => {
    e.preventDefault();
    // console.log(comment);
    fetch(`/listings/comments/postComment`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(commentFormObject),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === 200) {
          if (!selectedElement.comments) {
            setSelectedElement({
              ...selectedElement,
              comments: commentFormObject,
            });
          } else {
            setSelectedElement({
              ...selectedElement,
              comments: [...selectedElement.comments, commentFormObject],
            });
          }

          setCommentFormObject({
            listingId: selectedElement._id,
            comment: null,
            reply: null,
            commentId: null,
            username: currentUser.nickname,
          });
        }
      });
  };
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
            setShowCommentModal(false);
          }}
        />
        {!selectedElement.comments ||
          (selectedElement.comments.length < 1 && (
            <CommentFeedDiv>No comments yet...</CommentFeedDiv>
          ))}

        {selectedElement.comments && selectedElement.comments.length > 0 && (
          <CommentFeedDiv>
            {selectedElement.comments.map((comment, index) => {
              return (
                <div key={index}>
                  <IndividualCommentDiv>
                    <p style={{ fontWeight: "500", marginBottom: "3px" }}>
                      "{comment.username}" asked:
                    </p>
                    <p style={{ paddingLeft: "15px" }}>{comment.comment}</p>
                    {selectedElement._id === currentUser._id && (
                      <p
                        style={{ color: "blue" }}
                        onClick={() => {
                          setCommentorUsername(comment.username);
                          setCommentFormObject({
                            ...commentFormObject,
                            commentId: comment.id,
                          });
                          setShowReplyState(true);
                        }}
                      >
                        Reply
                      </p>
                    )}
                  </IndividualCommentDiv>
                  {comment.reply && (
                    <IndividualCommentDiv style={{ marginLeft: "25px" }}>
                      <p style={{ fontWeight: "500", marginBottom: "3px" }}>
                        <MdSubdirectoryArrowRight style={{ color: "blue" }} />
                        "Listing user" replied:
                      </p>
                      <p style={{ paddingLeft: "15px" }}>{comment.reply}</p>
                    </IndividualCommentDiv>
                  )}
                </div>
              );
            })}
          </CommentFeedDiv>
        )}
        <CommentFeedDiv>
          {selectedElement._id !== currentUser._id && (
            <CommentForm
              onSubmit={(e) => {
                handleCommentSubmit(e, e.target.value, "comment");
              }}
            >
              <textarea
                maxLength="100"
                rows="3"
                cols="40"
                onChange={(e) => {
                  setCommentFormObject({
                    ...commentFormObject,
                    comment: e.target.value,
                  });
                }}
              ></textarea>
              <button type="submit">Post</button>
            </CommentForm>
          )}
          {selectedElement._id === currentUser._id && showReplyState && (
            <CommentForm
              onSubmit={(e) => {
                handleCommentSubmit(e, e.target.value, "reply");
              }}
            >
              <textarea
                maxLength="100"
                rows="3"
                cols="40"
                placeholder={"@" + " " + commentorUsername}
                onChange={(e) => {
                  setCommentFormObject({
                    ...commentFormObject,
                    reply: e.target.value,
                  });
                }}
              ></textarea>
              <button type="submit">Reply</button>
            </CommentForm>
          )}
        </CommentFeedDiv>
      </CommentInfoContainer>
    </CommentModalContainer>
  );
};

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const IndividualCommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px 5px 10px;
  border-left: 1px solid black;
  margin-bottom: 5px;
`;

const CommentFeedDiv = styled.div`
  display: flex;
  margin: 8% auto;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 75%;
  height: fit-content;
  padding-right: 15px;
  overflow-y: scroll;
`;

const CommentInfoContainer = styled.div`
  @media (min-width: 768px) {
    width: 70%;
  }
  @media (min-width: 1100px) {
    width: 50%;
  }
  @media (max-width: 767.9px) {
    width: 80%;
    & p {
      font-size: 15px;
    }
  }
  /* overflow-y: scroll; */
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* padding-bottom: 20px; */
  color: black;
  border: 1px solid red;
  background-color: white;
  height: 90%;
  z-index: 6;
  & p {
    line-height: 1.3;
  }
`;
const CommentModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default CommentsModal;
