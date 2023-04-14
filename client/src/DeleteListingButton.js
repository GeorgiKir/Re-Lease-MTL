import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const DeleteListingButton = () => {
  const { user, isAuthenticated } = useAuth0();

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleListingDelete = () => {
    console.log(user.email);
    fetch(`/listings/deletelisting/${user.email}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log("Error: ", e);
      });

    fetch(`/listings/deletelisting/${currentUser._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentUser({ _id: currentUser._id, email: currentUser.email });
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };
  return (
    <DeleteButtonContainerDiv>
      <StyledDeleteButton
        onClick={() => {
          handleListingDelete();
        }}
      >
        Delete Listing
      </StyledDeleteButton>
    </DeleteButtonContainerDiv>
  );
};

const DeleteButtonContainerDiv = styled.div`
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }

  display: flex;
`;

const StyledDeleteButton = styled.button`
  position: relative;
  /* font-family: "Raleway", sans-serif; */
  font-family: "Open Sans", sans-serif;
  /* font-weight: 500; */
  border: 3px solid gray;
  border-radius: 5px;
  margin: 0px auto;
  background: none;
  cursor: pointer;
  color: black;
  display: flex;
  gap: 5px;
  margin-top: 20px;
  height: fit-content;
  width: fit-content;
  padding: 5px;
  font-size: 30px;
  align-items: center;
  &::before {
    content: "";
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background-color: black;
    position: absolute;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;
export default DeleteListingButton;
