import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { ProfileStyledButton } from "./Profile";
import { Trans, useTranslation } from "react-i18next";
import {
  CommentFeedDiv,
  CommentForm,
  CommentInfoContainer,
  CommentModalContainer,
  IndividualCommentDiv,
} from "./CommentsModal";

const ListingUserCommentsModal = ({ setShowCommentModal }) => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useContext(CurrentUserContext);
  const [showReplyState, setShowReplyState] = useState(false);
  const [commentorUsername, setCommentorUsername] = useState(null);
  const [replyFlag, setReplyFlag] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [commentFormObject, setCommentFormObject] = useState({
    listingId: currentUser._id,
    comment: null,
    reply: null,
    commentId: null,
    username: currentUser.nickname,
  });

  useEffect(() => {
    fetch(`/listings/getSingleListing/${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedElement(data.data);
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  }, [replyFlag]);

  const handleCommentSubmit = (e, comment, type) => {
    e.preventDefault();

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
          setReplyFlag(!replyFlag);
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
        {selectedElement && (
          <>
            {!selectedElement.comments ||
              (selectedElement.comments.length < 1 && (
                <CommentFeedDiv>
                  {t("commentsModal.noCommentsYet")}
                </CommentFeedDiv>
              ))}
            {selectedElement.comments &&
              selectedElement.comments.length > 0 && (
                <CommentFeedDiv>
                  {selectedElement.comments.map((comment, index) => {
                    return (
                      <div key={index}>
                        <IndividualCommentDiv>
                          <p style={{ fontWeight: "500", marginBottom: "3px" }}>
                            "{comment.username}" {t("commentsModal.asked")}
                          </p>
                          <p style={{ paddingLeft: "15px" }}>
                            {comment.comment}
                          </p>
                          {selectedElement._id === currentUser._id && (
                            <p
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => {
                                setCommentorUsername(comment.username);
                                setCommentFormObject({
                                  ...commentFormObject,
                                  commentId: comment.id,
                                });
                                setShowReplyState(true);
                              }}
                            >
                              {t("commentsModal.reply")}
                            </p>
                          )}
                        </IndividualCommentDiv>
                        {comment.reply && (
                          <IndividualCommentDiv style={{ marginLeft: "25px" }}>
                            <p
                              style={{ fontWeight: "500", marginBottom: "3px" }}
                            >
                              <MdSubdirectoryArrowRight
                                style={{ color: "blue" }}
                              />
                              {t("commentsModal.listingUserReplied")}
                            </p>
                            <p style={{ paddingLeft: "15px" }}>
                              {comment.reply}
                            </p>
                          </IndividualCommentDiv>
                        )}
                      </div>
                    );
                  })}
                </CommentFeedDiv>
              )}

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
                <ProfileStyledButton type="submit">
                  {t("commentsModal.reply")}
                </ProfileStyledButton>
              </CommentForm>
            )}
          </>
        )}
      </CommentInfoContainer>
    </CommentModalContainer>
  );
};

export default ListingUserCommentsModal;
