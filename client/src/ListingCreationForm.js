import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import VisitingHoursModal from "./VisitingHoursModal";
import { boroughs } from "./boroughs";

const ListingCreationForm = () => {
  const { user, isAuthenticated } = useAuth0();
  const [selectingVistingHours, setSelectingVisitingHours] = useState(false);
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
  });

  // useEffect(() => {
  //   setListingFormInfo({
  //     ...ListingFormInfo,
  //     visitSchedule: visitingHoursToBeAdded,
  //   });
  // }, [visitingHoursToBeAdded]);

  const handleChange = (value, name) => {
    setListingFormInfo({ ...ListingFormInfo, [name]: value });
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
    <>
      <StyledListingForm onSubmit={(e) => handleSubmit(e)}>
        <FormInputContainer>
          <p>Street Address</p>
          <input
            required
            name="listingAddress"
            type="text"
            placeholder={"Enter the address"}
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <p>Neighbourhood</p>
          <select
            required
            name="borough"
            placeholder={"Enter the neighbourhood"}
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          >
            <option value="" style={{ color: "gray" }}>
              Please Select a neighbourhood
            </option>
            ;
            {boroughs.map((borough) => {
              return <option value={borough.borough}>{borough.borough}</option>;
            })}
          </select>
        </FormInputContainer>
        <FormInputContainer>
          <p>Postal Code</p>
          <input
            required
            maxLength="6"
            name="postalCode"
            type="text"
            placeholder={"Enter the postal code"}
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <p>Price</p>
          <input
            required
            name="price"
            type="text"
            placeholder={"Enter the price per month"}
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <p># of Bedrooms</p>
          <input
            required
            name="numBDR"
            type="text"
            placeholder={"Enter the number of bedrooms"}
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          />
        </FormInputContainer>
        <FormInputContainer>
          <p>Visiting Hours</p>
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
            setSelectingVisitingHours={setSelectingVisitingHours}
            visitingHoursToBeAdded={visitingHoursToBeAdded}
            setVisitingHoursToBeAdded={setVisitingHoursToBeAdded}
            ListingFormInfo={ListingFormInfo}
            setListingFormInfo={setListingFormInfo}
          />
        )}
        <FormInputContainer>
          <p>Description</p>
          <textarea
            name="listingDescription"
            maxLength="300"
            rows="10"
            cols="50"
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          />
        </FormInputContainer>
        <button type="submit">Submit</button>
      </StyledListingForm>
    </>
  );
};

const FormInputContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  width: 70%;
  justify-content: space-between;
  margin-bottom: 2%;
  & p {
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
  height: 90vh;
`;

export default ListingCreationForm;
