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
    <>
      <StyledDeleteButton
        onClick={() => {
          handleListingDelete();
        }}
      >
        DeleteListingButton
      </StyledDeleteButton>
    </>
  );
};

const StyledDeleteButton = styled.button`
  position: relative;
  font-family: "Raleway", sans-serif;
  border: none;
  background: white;
  cursor: pointer;
  color: black;
  display: flex;
  gap: 5px;
  margin-top: 15px;
  height: fit-content;
  padding: 0;
  font-size: 35px;
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
