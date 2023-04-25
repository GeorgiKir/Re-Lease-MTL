import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { FiTrash2 } from "react-icons/fi";
import { Trans, useTranslation } from "react-i18next";

const DeleteListingButton = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth0();
  const [cancelVisitState, setCancelVisitState] = useState(false);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleListingDelete = () => {
    console.log(user.email);
    // fetch(`/listings/deletelisting/${user.email}`, {
    //   method: "PATCH",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     console.log("Error: ", e);
    //   });

    fetch(`/listings/deletelisting/${currentUser._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        listingPhotos: currentUser.listing.listingImage,
        email: user.email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentUser({
          _id: currentUser._id,
          email: currentUser.email,
          nickname: currentUser.nickname,
        });
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
  return (
    <DeleteButtonContainerDiv>
      <StyledDeleteButton
        onClick={() => {
          setCancelVisitState(true);
        }}
      >
        <FiTrash2 style={{ fontSize: "27px" }} />
        {/* <p>{t("buttons.delete")}</p> */}
      </StyledDeleteButton>
      {cancelVisitState && (
        <DeleteConfirmation
          setCancelVisitState={setCancelVisitState}
          handleListingDelete={handleListingDelete}
        />
      )}
    </DeleteButtonContainerDiv>
  );
};

const DeleteButtonContainerDiv = styled.div`
  /* @media (min-width: 768px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 100%;
  } */

  display: flex;
`;

export const StyledDeleteButton = styled.button`
  /* @media (min-width: 1160px) {
    font-size: 10px;
  }
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 767px) {
    font-size: 15px;
  } */
  cursor: pointer;
  position: relative;
  /* font-family: "Open Sans", sans-serif; */
  border: 2px solid #0078a0;
  border-radius: 5px;
  margin: 0px auto;
  font-size: 15px;
  background: none;
  cursor: pointer;
  color: #0078a0;
  display: flex;
  align-items: center;
  gap: 5px;
  height: fit-content;
  padding: 4px 10px;
  overflow: hidden;

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
export default DeleteListingButton;
