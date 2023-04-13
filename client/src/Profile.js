import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { MainPageContainer } from "./HomePage";
import styled from "styled-components";
import ListingCreationForm from "./ListingCreationForm";
import ProfileSidebar from "./ProfileSidebar";
import { useState, useEffect } from "react";
import DeleteListingButton from "./DeleteListingButton";
import ListingSchedulePage from "./ListingSchedulePage";
import UpcomingVisitsSchedulePage from "./UpcomingVisitsSchedulePage";
import ListingCreationTracker from "./ListingCreationTracker";

const Profile = () => {
  const [profileState, setProfileState] = useState("myListing");
  // const [listingCreationTracker, setListingCreationTracker] = useState("1");
  // const [listingUpdate, setListingUpdate] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { user, isAuthenticated } = useAuth0();

  // useEffect(() => {
  //   setListingUpdate(!listingUpdate);
  // }, [currentUser]);

  return (
    isAuthenticated &&
    currentUser && (
      <MainPageContainer>
        <ProfileSidebar
          setProfileState={setProfileState}
          profileState={profileState}
        />
        <ProfilePageContentDiv>
          {currentUser.listing && profileState === "myListing" && (
            <>
              <MyListingWrapper>
                <img
                  src={currentUser.listing.listingImage}
                  width="500px"
                  height="auto"
                />
                <h1>Address</h1>
                <h2>
                  <h2>{currentUser.listing.listingAddress}</h2>
                  <h2>
                    {currentUser.listing.postalCode}{" "}
                    {currentUser.listing.borough}
                  </h2>
                  <h2>Montreal QC</h2>
                </h2>
                <h1>Price: </h1>
                <h2>{currentUser.listing.price} $</h2>
                <h1>Bedrooms:</h1>{" "}
                <h2>{currentUser.listing.numBDR} bedrooms</h2>
                <h1>Description:</h1>
                <h2>{currentUser.listing.listingDescription}</h2>
              </MyListingWrapper>
              <DeleteListingButton />
            </>
          )}
          {profileState === "myListing" && !currentUser.listing && (
            <>
              {/* <ListingCreationTracker /> */}
              <ListingCreationForm
              // listingCreationTracker={listingCreationTracker}
              // setListingCreationTracker={setListingCreationTracker}
              // setListingUpdate={setListingUpdate}
              // listingUpdate={listingUpdate}
              />
            </>
          )}
          {profileState === "ListingSchedule" && (
            <MyListingWrapper>
              <ListingSchedulePage />
            </MyListingWrapper>
          )}
          {profileState === "VisitSchedule" && (
            <MyListingWrapper>
              <UpcomingVisitsSchedulePage />
            </MyListingWrapper>
          )}
        </ProfilePageContentDiv>
      </MainPageContainer>
    )
  );
};

const MyListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #efefef;
  border: 1px solid gray;
  width: 80%;
  height: fit-content;
  border-radius: 5px;
  padding: 15px 10px;
  & h2 {
    padding: 0px;
    margin: 0px auto;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }
  & p {
    text-align: center;
  }
  & h1 {
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid gray;
  }
  & img {
    margin: 10px auto;
  }
`;
export const ProfilePageContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 125px auto 0px auto;
  width: 65%;
`;

export default Profile;
