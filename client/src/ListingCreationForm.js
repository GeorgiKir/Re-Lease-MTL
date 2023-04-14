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

const ListingCreationForm = () => {
  const { user, isAuthenticated } = useAuth0();
  const [selectingVistingHours, setSelectingVisitingHours] = useState(false);
  const [listingCreationTracker, setListingCreationTracker] = useState(1);
  const [visitingHoursToBeAdded, setVisitingHoursToBeAdded] = useState([]);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [ListingFormInfo, setListingFormInfo] = useState({
    listingId: currentUser._id,
    email: currentUser.email,
    postalCode: "",
    listingAddress: "",
    borough: "",
    price: "",
    numBDR: "",
    listingDescription: "",
    listingImage: "",
  });

  const handleChange = (value, name) => {
    setListingFormInfo({ ...ListingFormInfo, [name]: value });
    // console.log(value[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (visitingHoursToBeAdded.length <= 0) {
      console.log("Please select some visiting hours");
    } else {
      fetch(`/timeSlots/addTimeSlots`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ selectedTimeSlots: visitingHoursToBeAdded }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

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
          console.log(resData);

          fetch(`/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              window.sessionStorage.setItem(
                "userId",
                JSON.stringify({
                  email: data.data.email,
                  _id: data.data._id,
                  listing: data.data.listingInfo,
                })
              );
              setCurrentUser(
                JSON.parse(window.sessionStorage.getItem("userId"))
              );
            })
            .catch((e) => {
              console.log("Error: ", e);
            });
        });
    }
  };
  return (
    <ListingContainerDiv>
      <ListingCreationTracker
        listingCreationTracker={listingCreationTracker}
        visitingHoursToBeAdded={visitingHoursToBeAdded}
        listingImage={ListingFormInfo.listingImage}
      />
      <StyledListingForm onSubmit={(e) => handleSubmit(e)}>
        {listingCreationTracker === 1 && (
          <>
            <FormInputContainer>
              <h2>Street Address</h2>
              <input
                required
                name="listingAddress"
                value={ListingFormInfo.listingAddress}
                type="text"
                placeholder={"Enter the address"}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </FormInputContainer>
            <FormInputContainer>
              <h2>Neighbourhood</h2>
              <select
                required
                name="borough"
                value={ListingFormInfo.borough}
                placeholder={"Enter the neighbourhood"}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              >
                <option value="" style={{ color: "gray" }}>
                  Please Select a neighbourhood
                </option>
                ;
                {boroughs.map((borough) => {
                  return (
                    <option value={borough.borough}>{borough.borough}</option>
                  );
                })}
              </select>
            </FormInputContainer>
            <FormInputContainer>
              <h2>Postal Code</h2>
              <input
                required
                maxLength="6"
                name="postalCode"
                value={ListingFormInfo.postalCode}
                type="text"
                placeholder={"Enter the postal code"}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </FormInputContainer>{" "}
            {ListingFormInfo.postalCode.length > 0 &&
              ListingFormInfo.listingAddress.length > 0 &&
              ListingFormInfo.borough.length > 0 && (
                <button
                  type="button"
                  onClick={() => setListingCreationTracker(2)}
                >
                  Next
                </button>
              )}
          </>
        )}
        {listingCreationTracker === 2 && (
          <>
            <FormInputContainer>
              <h2>Price</h2>
              <input
                required
                name="price"
                type="text"
                placeholder={"Enter the price per month"}
                value={ListingFormInfo.price}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </FormInputContainer>
            <FormInputContainer>
              <h2># of Bedrooms</h2>
              <input
                required
                name="numBDR"
                type="number"
                value={ListingFormInfo.numBDR}
                placeholder={"Enter the number of bedrooms"}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
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
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </FormInputContainer>
            <button type="button" onClick={() => setListingCreationTracker(1)}>
              Previous
            </button>
            {ListingFormInfo.price.length > 0 &&
              ListingFormInfo.numBDR.length > 0 &&
              ListingFormInfo.numBDR > 0 &&
              ListingFormInfo.listingDescription.length > 0 && (
                <button
                  type="button"
                  onClick={() => setListingCreationTracker(3)}
                >
                  NEXT
                </button>
              )}
          </>
        )}
        {(listingCreationTracker === 3 || listingCreationTracker === 4) && (
          <>
            <FormInputContainer>
              <h2>Visiting Hours</h2>
              <button
                type="button"
                onClick={() => {
                  setSelectingVisitingHours(true);
                }}
              >
                Set Hours
              </button>
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
            <button type="button" onClick={() => setListingCreationTracker(2)}>
              Previous
            </button>
            <button type="button" onClick={() => setListingCreationTracker(5)}>
              NEXT
            </button>
          </>
        )}
        {listingCreationTracker === 5 && (
          <div>
            <UploadImage
              ListingFormInfo={ListingFormInfo}
              setListingFormInfo={setListingFormInfo}
            />
            <button type="button" onClick={() => setListingCreationTracker(4)}>
              Previous
            </button>
            <button type="submit">Submit</button>
          </div>
        )}
      </StyledListingForm>
    </ListingContainerDiv>
  );
};

const ListingContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: fit content; */
`;

const FormInputContainer = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
  margin-bottom: 2%;
  & h2 {
    font-size: 35px;
  }
  & input {
    width: 50%;
  }
`;

const StyledListingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  /* height: 20vh; */
`;

export default ListingCreationForm;
