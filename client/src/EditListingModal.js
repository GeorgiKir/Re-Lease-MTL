import React from "react";
import { CommentInfoContainer, CommentModalContainer } from "./CommentsModal";
import { GrClose } from "react-icons/gr";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { boroughs } from "./boroughs";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { ProfileStyledButton } from "./Profile";
import { StyledDeleteButton } from "./DeleteListingButton";
import { Trans, useTranslation } from "react-i18next";

const EditListingModal = ({
  listing,
  setShowEditModal,
  updateMessage,
  setUpdateMessage,
}) => {
  const { t, i18n } = useTranslation();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  //   const [updateMessage, setUpdateMessage] = useState(null);
  const [editedFormInfo, setEditedFormInfo] = useState({
    email: currentUser.email,
    listingId: listing._id,
    postalCode: listing.postalCode,
    listingAddress: listing.listingAddress,
    borough: listing.borough,
    price: listing.price,
    numBDR: listing.numBDR,
    listingDescription: listing.listingDescription,
    listingImage: listing.listingImage,
    comments: listing.comments,
  });
  //   console.log(listing);

  const handleChange = (value, name) => {
    if (updateMessage) {
      setUpdateMessage(null);
    }
    setEditedFormInfo({ ...editedFormInfo, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/listings/updateListings/${currentUser._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(editedFormInfo),
    })
      .then((res) => res.json())
      .then((resData) => {
        setUpdateMessage(resData.message);
        window.sessionStorage.setItem(
          "userId",
          JSON.stringify({
            email: currentUser.email,
            _id: currentUser._id,
            listing: resData.data,
            nickname: currentUser.nickname,
          })
        );
        setCurrentUser(JSON.parse(window.sessionStorage.getItem("userId")));
      });
  };

  return (
    <CommentModalContainer>
      <CommentInfoContainer>
        <GrClose
          style={{
            cursor: "pointer",
            fontSize: "35px",
            marginTop: "1%",
            marginLeft: "1%",
            position: "absolute",
          }}
          onClick={() => {
            setShowEditModal(false);
          }}
        />
        <EditForm onSubmit={(e) => handleSubmit(e)}>
          <EditFormInputContainer>
            <h2>{t("form.streetAdress")}</h2>
            <input
              required
              type="text"
              name="listingAddress"
              defaultValue={listing.listingAddress}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            ></input>
          </EditFormInputContainer>
          <EditFormInputContainer>
            <h2>{t("form.neighbourhood")}</h2>
            <select
              required
              name="borough"
              defaultValue={listing.borough}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            >
              <option value="" style={{ color: "gray" }}>
                {listing.borough}
              </option>
              ;
              {boroughs.map((borough) => {
                return (
                  <option value={borough.borough}>{borough.borough}</option>
                );
              })}
            </select>
          </EditFormInputContainer>
          <EditFormInputContainer>
            <h2>{t("form.postalCode")}</h2>
            <input
              required
              type="text"
              maxLength="6"
              name="postalCode"
              defaultValue={listing.postalCode}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            ></input>
          </EditFormInputContainer>
          <EditFormInputContainer>
            <h2>{t("form.price")}</h2>
            <input
              required
              type="number"
              name="price"
              defaultValue={listing.price}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            ></input>
          </EditFormInputContainer>
          <EditFormInputContainer>
            <h2>{t("form.bedrooms")}</h2>
            <input
              required
              type="number"
              name="numBDR"
              defaultValue={listing.numBDR}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            ></input>
          </EditFormInputContainer>
          <EditFormInputContainer>
            <h2>Description</h2>
            <textarea
              required
              maxLength="300"
              rows="10"
              cols="50"
              name="listingDescription"
              defaultValue={listing.listingDescription}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            ></textarea>
          </EditFormInputContainer>
          <div>
            {updateMessage && (
              <p style={{ marginBottom: "15px" }}>{updateMessage}</p>
            )}
            <StyledDeleteButton
              style={{
                fontSize: "30px",
                padding: "0px 10px",
                fontFamily: " 'Jost', sans-serif",
              }}
              type="submit"
            >
              {t("buttons.submit")}
            </StyledDeleteButton>
          </div>
        </EditForm>
      </CommentInfoContainer>
    </CommentModalContainer>
  );
};

const EditFormInputContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-bottom: 2%;
  line-height: 1.5;
  /* border: 1px solid black; */

  input:focus,
  textarea:focus,
  select:focus-visible {
    outline: none;
    border: 2px solid #00abe4;
    border-radius: 3px;
  }
`;
const EditForm = styled.form`
  height: 80%;
  margin-top: 6%;
  font-size: 20px;
  font-weight: 500;
  color: #00abe4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  & input,
  textarea,
  select {
    width: 50%;
  }
  /* border: 1px solid red; */
`;
export default EditListingModal;
