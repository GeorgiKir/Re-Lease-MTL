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
            <ListingInfoMainContainer>
              <img src={currentUser.listing.listingImage} />
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
                  <p>{currentUser.listing.listingDescription}</p>
                </IndividualInfoDiv>
                <DeleteListingButton />
              </ListingInfoProfileDiv>
            </ListingInfoMainContainer>
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

const ListingInfoMainContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    & img {
      width: 60%;
      height: scale;
      border-radius: 5px;
    }
  }
  @media (max-width: 767.9px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50vh;
    justify-content: space-between;
    & img {
      width: 80%;
      height: 300px;
      border-radius: 5px;
    }
  }
`;
const ListingInfoProfileDiv = styled.div`
  @media (min-width: 768px) {
    width: 40%;
    height: 60vh;
    margin-left: 20px;
  }
  @media (max-width: 767px) {
    width: 90%;
    min-height: 40vh;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* border: 1px solid green; */
`;
const IndividualInfoDiv = styled.div`
  @media (min-width: 768px) {
    gap: 10%;
    & p {
      text-align: justify;
      text-justify: inter-word;
      font-size: 20px;
      width: fit-content;
    }
  }
  @media (max-width: 767px) {
    gap: 20%;
    & p {
      text-align: justify;
      text-justify: inter-word;
      font-size: 15px;
      width: fit-content;
    }
  }
  justify-content: flex-start;

  display: flex;
  flex-direction: row;
  margin: 0px auto;
  width: 80%;
`;
const MyListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #efefef;
  border: 1px solid gray;
  height: fit-content;
  border-radius: 5px;
  margin: 0px auto;

  @media (min-width: 768px) {
    padding: 15px 10px;
    width: 70%;
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
  }
  @media (max-width: 767px) {
    width: 80%;
    padding: 10px 5px;
    & p {
      padding: 0px;
      font-size: 15px;
    }
    & h1 {
      margin-bottom: 5px;
      font-size: 15px;
      font-weight: 500;
      border-bottom: 1px solid #5e6572;
    }
  }

  & img {
    margin: 10px auto;
  }
`;
export const ProfilePageContentDiv = styled.div`
  @media (min-width: 768px) {
    flex-direction: row;
    width: 85%;
    justify-content: space-between;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    width: 95%;
  }
  display: flex;

  align-items: center;
  margin: 125px auto 50px auto;
  /* height: fit-content; */
  /* border: 1px solid black; */
  height: 100%;
`;

export default Profile;
