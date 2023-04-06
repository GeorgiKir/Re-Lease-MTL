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

const Profile = () => {
  const [profileState, setProfileState] = useState("myListing");
  const [listingUpdate, setListingUpdate] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    setListingUpdate(!listingUpdate);
  }, [currentUser]);

  return (
    isAuthenticated &&
    currentUser && (
      <MainPageContainer>
        <ProfileSidebar setProfileState={setProfileState} />
        <ProfilePageContentDiv>
          {/* <h1>{currentUser.listing.listingAddress}</h1> */}
          {currentUser.listing && profileState === "myListing" && (
            <>
              <p> Address: {currentUser.listing.listingAddress}</p>
              <p> Price: {currentUser.listing.price} $</p>
              <p> Bedrooms: {currentUser.listing.numBDR}</p>
              {/* {currentUser.listing.visitSchedule.map((item) => {
                return (
                  <>
                    <p>Date: {item[0]}</p>
                    <p>Times: </p>
                    {item[1].map((element) => {
                      return <p>{element}</p>;
                    })}
                  </>
                );
              })} */}
              <DeleteListingButton />
            </>
          )}
          {/* {!currentUser.listing && <h1>LISTING NOT FOUND</h1>} */}
          {profileState === "myListing" && !currentUser.listing && (
            <ListingCreationForm
              setListingUpdate={setListingUpdate}
              listingUpdate={listingUpdate}
            />
          )}
          {profileState === "ListingSchedule" && currentUser.listing && (
            <ListingSchedulePage />
          )}
        </ProfilePageContentDiv>
      </MainPageContainer>
    )
  );
};

const ProfilePageContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 145px auto 0px auto;
  width: 75vw;
  /* height: 90vh; */
`;

export default Profile;
