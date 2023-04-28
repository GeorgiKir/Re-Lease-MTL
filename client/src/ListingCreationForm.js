import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import VisitingHoursModal from "./VisitingHoursModal";
import { boroughs } from "./boroughs";
import ListingCreationTracker from "./ListingCreationTracker";
import UploadImage from "./UploadImage";
import gearImg from "./assets/gear_img.png";
import ProcessingPage from "./ProcessingPage";
import ViewScheduleModal from "./ViewScheduleModal";
import { Trans, useTranslation } from "react-i18next";
import { ProfileStyledButton } from "./Profile";
import ErrorFormModal from "./ErrorFormModal";

const ListingCreationForm = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth0();
  const [selectingVistingHours, setSelectingVisitingHours] = useState(false);
  const [listingCreationTracker, setListingCreationTracker] = useState(1);
  const [visitingHoursToBeAdded, setVisitingHoursToBeAdded] = useState([]);
  const [processingState, setProcessingState] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toggleViewVisitHours, setToggleViewVisitHours] = useState(false);
  const [ListingFormInfo, setListingFormInfo] = useState({
    listingId: currentUser._id,
    email: currentUser.email,
    postalCode: "",
    listingAddress: "",
    borough: "",
    price: "",
    numBDR: "",
    listingDescription: "",
    selectedTimeSlots: [],
    listingImage: [],
    comments: [],
  });

  const handleChange = (value, name) => {
    setListingFormInfo({ ...ListingFormInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (visitingHoursToBeAdded.length <= 0) {
    } else if (ListingFormInfo.selectedTimeSlots.length > 0) {
      fetch(`/listings/addListing`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(ListingFormInfo),
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.status !== 200) {
            setErrorMessage(
              "Invalid information entered. Double check the address."
            );
          }

          fetch(`/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
              window.sessionStorage.setItem(
                "userId",
                JSON.stringify({
                  email: data.data.email,
                  _id: data.data._id,
                  listing: data.data.listingInfo,
                  nickname: currentUser.nickname,
                })
              );
              setCurrentUser(
                JSON.parse(window.sessionStorage.getItem("userId"))
              );
              setProcessingState(false);
            })
            .catch((e) => {
              console.log("Error: ", e);
            });
        });
    }
  };
  return (
    <ListingContainerDiv>
      {errorMessage && (
        <ErrorFormModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {processingState && <ProcessingPage />}
      {!processingState && (
        <>
          <ListingCreationTracker
            listingCreationTracker={listingCreationTracker}
            visitingHoursToBeAdded={visitingHoursToBeAdded}
            listingImage={ListingFormInfo.listingImage}
          />
          <StyledListingForm
            onSubmit={(e) => {
              handleSubmit(e);
              setProcessingState(true);
            }}
          >
            {listingCreationTracker === 1 && (
              <>
                <FormInputContainer>
                  <h2>{t("form.streetAdress")}</h2>
                  <input
                    required
                    name="listingAddress"
                    value={ListingFormInfo.listingAddress}
                    type="text"
                    placeholder={t("form.enterStreetAdress")}
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  />
                </FormInputContainer>
                <FormInputContainer>
                  <h2>{t("form.neighbourhood")}</h2>
                  <select
                    required
                    name="borough"
                    value={ListingFormInfo.borough}
                    // placeholder={"Enter the neighbourhood"}
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  >
                    <option value="" style={{ color: "gray" }}>
                      {t("form.selectNeighbourhood")}
                    </option>
                    {boroughs.map((borough) => {
                      return (
                        <option value={borough.borough}>
                          {borough.borough}
                        </option>
                      );
                    })}
                  </select>
                </FormInputContainer>
                <FormInputContainer>
                  <h2>{t("form.postalCode")}</h2>
                  <input
                    required
                    maxLength="6"
                    name="postalCode"
                    value={ListingFormInfo.postalCode}
                    type="text"
                    placeholder={t("form.enterPostalCode")}
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  />
                </FormInputContainer>
                <>
                  {ListingFormInfo.postalCode.length > 0 &&
                    ListingFormInfo.listingAddress.length > 0 &&
                    ListingFormInfo.borough.length > 0 && (
                      <StyledPreviousNextButton
                        type="button"
                        onClick={() => setListingCreationTracker(2)}
                      >
                        {t("buttons.next")}
                      </StyledPreviousNextButton>
                    )}
                </>
              </>
            )}
            {listingCreationTracker === 2 && (
              <>
                <FormInputContainer>
                  <h2>{t("form.price")}</h2>
                  <input
                    required
                    name="price"
                    type="number"
                    placeholder={t("form.selectPrice")}
                    value={ListingFormInfo.price}
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  />
                </FormInputContainer>
                <FormInputContainer>
                  <h2>{t("form.bedrooms")}</h2>
                  <input
                    required
                    name="numBDR"
                    type="number"
                    value={ListingFormInfo.numBDR}
                    placeholder={t("form.selectBedrooms")}
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  />
                </FormInputContainer>

                <FormInputContainer>
                  <h2>Description</h2>
                  <textarea
                    name="listingDescription"
                    value={ListingFormInfo.listingDescription}
                    maxLength="300"
                    rows="10"
                    cols="50"
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  />
                </FormInputContainer>
                <PreviousNextButtonDiv>
                  <StyledPreviousNextButton
                    type="button"
                    onClick={() => setListingCreationTracker(1)}
                  >
                    {t("buttons.previous")}
                  </StyledPreviousNextButton>
                  {ListingFormInfo.price.length > 0 &&
                    ListingFormInfo.numBDR.length > 0 &&
                    ListingFormInfo.numBDR > 0 &&
                    ListingFormInfo.listingDescription.length > 0 && (
                      <StyledPreviousNextButton
                        type="button"
                        onClick={() => setListingCreationTracker(3)}
                      >
                        {t("buttons.next")}
                      </StyledPreviousNextButton>
                    )}
                </PreviousNextButtonDiv>
              </>
            )}
            {(listingCreationTracker === 3 || listingCreationTracker === 4) && (
              <>
                <FormInputContainer>
                  <h2>{t("form.visitingHours")}</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <ProfileStyledButton
                      style={{ marginBottom: "5px", fontSize: "18px" }}
                      type="button"
                      onClick={() => {
                        setSelectingVisitingHours(true);
                      }}
                    >
                      {t("form.setHours")}
                    </ProfileStyledButton>
                    <ProfileStyledButton
                      style={{ fontSize: "18px" }}
                      type="button"
                      onClick={() => {
                        setToggleViewVisitHours(true);
                      }}
                    >
                      {t("form.viewSchedule")}
                    </ProfileStyledButton>
                    {toggleViewVisitHours && (
                      <ViewScheduleModal
                        setToggleViewVisitHours={setToggleViewVisitHours}
                        selectedTimeSlots={ListingFormInfo.selectedTimeSlots}
                      />
                    )}
                  </div>
                </FormInputContainer>
                {selectingVistingHours && (
                  <VisitingHoursModal
                    setListingCreationTracker={setListingCreationTracker}
                    setSelectingVisitingHours={setSelectingVisitingHours}
                    visitingHoursToBeAdded={visitingHoursToBeAdded}
                    setVisitingHoursToBeAdded={setVisitingHoursToBeAdded}
                    ListingFormInfo={ListingFormInfo}
                    setListingFormInfo={setListingFormInfo}
                  />
                )}
                <PreviousNextButtonDiv>
                  <StyledPreviousNextButton
                    type="button"
                    onClick={() => setListingCreationTracker(2)}
                  >
                    {t("buttons.previous")}
                  </StyledPreviousNextButton>
                  {visitingHoursToBeAdded.length > 0 && (
                    <StyledPreviousNextButton
                      type="button"
                      onClick={() => setListingCreationTracker(5)}
                    >
                      {t("buttons.next")}
                    </StyledPreviousNextButton>
                  )}
                </PreviousNextButtonDiv>
              </>
            )}
            {listingCreationTracker === 5 && (
              <FormInputContainer
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <UploadImage
                  ListingFormInfo={ListingFormInfo}
                  setListingFormInfo={setListingFormInfo}
                />
                <PreviousNextButtonDiv>
                  <StyledPreviousNextButton
                    type="button"
                    onClick={() => setListingCreationTracker(4)}
                  >
                    {t("buttons.previous")}
                  </StyledPreviousNextButton>
                  {ListingFormInfo.listingImage &&
                    ListingFormInfo.listingImage.length > 0 && (
                      <StyledPreviousNextButton type="submit">
                        {t("form.createListing")}
                      </StyledPreviousNextButton>
                    )}
                </PreviousNextButtonDiv>
              </FormInputContainer>
            )}
          </StyledListingForm>
        </>
      )}
    </ListingContainerDiv>
  );
};

const StyledPreviousNextButton = styled.button`
  @media (min-width: 768px) {
    min-width: 100px;
    max-width: fit-content;
    font-size: 20px;
    padding: 5px 5px;
  }
  @media (max-width: 767px) {
    width: 85px;
    font-size: 15px;
    padding: 10px 10px;
  }
  /* margin-right: 30px; */
  font-family: "Jost", sans-serif;
  cursor: pointer;
  background-color: #659db0;
  border: none;
  border-radius: 5px;
  color: white;
  &:hover {
    scale: 1.2;
  }
`;

export const PreviousNextButtonDiv = styled.div`
  display: flex;
  gap: 15px;
`;

const ListingContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
  /* height: fit content; */
`;

const FormInputContainer = styled.div`
  @media (min-width: 768px) {
    & h2 {
      font-size: 35px;
    }
    & input {
      width: 50%;
      height: 40px;
    }
    & select {
      width: 50%;
      height: 40px;
    }
  }
  @media (max-width: 767px) {
    & h2 {
      font-size: 25px;
      margin-bottom: 10px;
    }
    & input {
      width: 80%;
      height: 40px;
      margin-bottom: 20px;
    }
    & select {
      width: 80%;
      height: 40px;
      margin-bottom: 20px;
    }
    & textarea {
      width: 90%;
    }
    flex-direction: column;
  }
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin-bottom: 2%;
  align-items: center;
`;

const StyledListingForm = styled.form`
  @media (min-width: 768px) {
    justify-content: space-evenly;
  }
  @media (max-width: 767px) {
    justify-content: space-evenly;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 30vh;
  width: 100%;
  input:focus,
  textarea:focus,
  select:focus-visible {
    outline: none;
    border: 2px solid #00abe4;
    border-radius: 3px;
  }
`;

export default ListingCreationForm;
