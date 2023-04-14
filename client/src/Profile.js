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
import { FiMapPin } from "react-icons/fi";
import { TbHomeDollar } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";

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
              <img
                src={currentUser.listing.listingImage}
                width="50%"
                height="scale"
                style={{ borderRadius: "5px" }}
              />
              <ListingInfoProfileDiv>
                <IndividualInfoDiv>
                  <FiMapPin style={{ fontSize: "30px" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>{currentUser.listing.listingAddress}</p>
                    <p>
                      {currentUser.listing.postalCode}{" "}
                      {currentUser.listing.borough}
                    </p>
                    <p>Montreal QC</p>
                  </div>
                </IndividualInfoDiv>
                <IndividualInfoDiv>
                  <TbHomeDollar style={{ fontSize: "30px" }} />
                  <p>{currentUser.listing.price} $</p>
                </IndividualInfoDiv>
                <IndividualInfoDiv>
                  <FaBed style={{ fontSize: "30px" }} />
                  <p>{currentUser.listing.numBDR} bedrooms</p>
                </IndividualInfoDiv>
                <IndividualInfoDiv>
                  <GrDocumentText style={{ fontSize: "30px" }} />
                  <p style={{ fontSize: "17px" }}>
                    {currentUser.listing.listingDescription}
                  </p>
                </IndividualInfoDiv>
                <DeleteListingButton />
              </ListingInfoProfileDiv>
              {/* <MyListingWrapper>
                <img
                  src={currentUser.listing.listingImage}
                  width="80%"
                  height="scale"
                  style={{ borderRadius: "5px", maxWidth: "500px" }}
                />
                <h1>Address</h1>
                <p>
                  <p>{currentUser.listing.listingAddress}</p>
                  <p>
                    {currentUser.listing.postalCode}{" "}
                    {currentUser.listing.borough}
                  </p>
                  <p>Montreal QC</p>
                </p>
                <h1>Price: </h1>
                <p>{currentUser.listing.price} $</p>
                <h1>Bedrooms:</h1> <p>{currentUser.listing.numBDR} bedrooms</p>
                <h1>Description:</h1>
                <p>{currentUser.listing.listingDescription}</p>
              </MyListingWrapper> */}
            </>
          )}
          {profileState === "myListing" && !currentUser.listing && (
            <MyListingWrapper>
              <ListingCreationForm />
            </MyListingWrapper>
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

const ListingInfoProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 40%;
  margin-left: 20px;
  height: 60vh;
`;
const IndividualInfoDiv = styled.div`
  justify-content: flex-start;
  gap: 10%;
  display: flex;
  flex-direction: row;
  margin: 0px auto;
  width: 80%;
  & p {
    text-align: justify;
    text-justify: inter-word;
    font-size: 20px;
    /* display: block; */
    width: fit-content;
    /* border: 1px solid black; */
  }
`;
const MyListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  background-color: #efefef;
  border: 1px solid gray;
  /* box-shadow: 0px 6px 15px -6px rgba(0, 0, 0, 0.64); */
  width: 70%;
  height: fit-content;
  border-radius: 5px;
  margin: 0px auto;
  padding: 15px 10px;

  & p {
    padding: 0px;
    font-size: 20px;
    /* width: 70%; */
  }
  & h1 {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 500;
    border-bottom: 1px solid #5e6572;
  }
  & img {
    margin: 10px auto;
  }
`;
export const ProfilePageContentDiv = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 125px auto 50px auto;
  /* height: fit-content; */
  width: 85%;
  height: 100%;
`;

export default Profile;
