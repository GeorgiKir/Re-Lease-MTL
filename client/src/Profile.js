import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineComment, AiOutlineEdit } from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TbHomeDollar } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import DeleteListingButton from "./DeleteListingButton";
import EditListingModal from "./EditListingModal";
import { MainPageContainer } from "./HomePage";
import ListingCreationForm from "./ListingCreationForm";
import ListingSchedulePage from "./ListingSchedulePage";
import ListingUserCommentsModal from "./ListingUserCommentModal";
import ProfileSidebar from "./ProfileSidebar";
import UpcomingVisitsSchedulePage from "./UpcomingVisitsSchedulePage";

const Profile = ({ setNavigationState }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState("myListing");
  const { currentUser, logoutState } = useContext(CurrentUserContext);
  const { user, isAuthenticated } = useAuth0();
  const [showPhotoTracker, setShowPhotoTracker] = useState(0);
  const [numOfListingPhotos, setNumOfListingPhotos] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  let handlePhotoTracker;

  if (!isAuthenticated) {
    navigate("/");
  } else {
    setNavigationState("profile");
    handlePhotoTracker = (count) => {
      if (count === 1) {
        if (showPhotoTracker === numOfListingPhotos - 1) {
          setShowPhotoTracker(0);
        } else {
          setShowPhotoTracker((prev) => prev + 1);
        }
      } else {
        if (showPhotoTracker === 0) {
          setShowPhotoTracker(numOfListingPhotos - 1);
        } else {
          setShowPhotoTracker((prev) => prev - 1);
        }
      }
    };
  }

  useEffect(() => {
    if (!logoutState && isAuthenticated) {
      if (currentUser.listing) {
        setNumOfListingPhotos(currentUser.listing.listingImage.length);
        setNavigationState("profile");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  }, [currentUser, updateMessage]);

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
              <ArrowContainerDiv
                style={{
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handlePhotoTracker(0);
                }}
              >
                <SlArrowLeft style={{ fontSize: "35px" }} />
              </ArrowContainerDiv>
              <img
                src={currentUser.listing.listingImage[showPhotoTracker].url}
              />
              <MobileArrowContainerDiv>
                <SlArrowLeft
                  onClick={() => {
                    handlePhotoTracker(0);
                  }}
                />
                <SlArrowRight
                  onClick={() => {
                    handlePhotoTracker(1);
                  }}
                />
              </MobileArrowContainerDiv>
              <ArrowContainerDiv
                style={{
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handlePhotoTracker(1);
                }}
              >
                <SlArrowRight style={{ fontSize: "35px" }} />
              </ArrowContainerDiv>

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
                  <p>
                    {currentUser.listing.numBDR} {t("listingModal.bedrooms")}
                  </p>
                </IndividualInfoDiv>
                <IndividualInfoDiv>
                  <GrDocumentText style={{ fontSize: "30px" }} />
                  <p>{currentUser.listing.listingDescription}</p>
                </IndividualInfoDiv>
                <ProfileButtonContainer>
                  <DeleteListingButton />

                  <ProfileStyledButton
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => {
                      setShowCommentModal(true);
                    }}
                  >
                    <AiOutlineComment style={{ fontSize: "35px" }} />{" "}
                    {/* <p>{t("buttons.comments")}</p> */}
                  </ProfileStyledButton>
                  <ProfileStyledButton
                    onClick={() => {
                      setShowEditModal(true);
                    }}
                  >
                    <AiOutlineEdit style={{ fontSize: "35px" }} />
                    {/* <p>{t("buttons.edit")}</p> */}
                  </ProfileStyledButton>
                </ProfileButtonContainer>
                {showCommentModal && (
                  <ListingUserCommentsModal
                    setShowCommentModal={setShowCommentModal}
                  />
                )}
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
          {showEditModal && (
            <EditListingModal
              listing={currentUser.listing}
              setShowEditModal={setShowEditModal}
              updateMessage={updateMessage}
              setUpdateMessage={setUpdateMessage}
            />
          )}
        </ProfilePageContentDiv>
      </MainPageContainer>
    )
  );
};

export const ProfileStyledButton = styled.button`
  @media (min-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 767.9px) {
    font-size: 15px;
  }
  font-family: "Jost", sans-serif;
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: flex;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid #0078a0;
  gap: 5px;
  padding: 0px 10px;
  /* font-size: 20px; */
  cursor: pointer;
  color: #0078a0;

  &:hover,
  :focus {
    color: white;
  }
  &::before {
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background-color: #0078a0;
    position: absolute;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 500ms ease-in-out;
  }
  &:hover::before,
  :focus::before {
    transform: scaleX(1);
  }
`;

const ProfileButtonContainer = styled.div`
  @media (max-width: 870px) {
    width: 60%;
    margin: 20px auto 0px auto;
  }
  display: flex;

  font-size: 20px;
  width: 100%;
  align-items: flex-end;
  justify-content: space-evenly;
  margin-top: 20px;
`;

export const MobileArrowContainerDiv = styled.div`
  @media (min-width: 767px) {
    display: none;
  }
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px 0px;
  width: 80%;
  display: flex;
  margin: 15px 0px;
  flex-direction: row;
  background: transparent;
  justify-content: space-evenly;
  & svg {
    color: #00abe4;
    font-size: 20px;
  }
`;
export const ArrowContainerDiv = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  color: #00abe4;
  font-weight: 600;
`;

const ListingInfoMainContainer = styled.div`
  @media (min-width: 767px) {
    display: flex;
    flex-direction: row;
    margin: 0px auto;
    width: 100%;
    & img {
      width: 60%;
      height: scale;
      max-height: 650px;
      border-radius: 10px;
    }
  }
  @media (max-width: 767px) {
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
  @media (min-width: 870px) {
    width: 40%;
    margin-left: 20px;
  }
  @media (max-width: 870px) {
    width: 90%;
    height: fit-content;
    margin-top: 10px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const IndividualInfoDiv = styled.div`
  @media (min-width: 870px) {
    gap: 10%;
    & p {
      line-height: 1.2;
      font-size: 15px;
      width: fit-content;
    }
  }
  @media (min-width: 1160px) {
    gap: 10%;
    & p {
      line-height: 1.2;
      font-size: 20px;
      width: fit-content;
    }
  }
  @media (max-width: 870px) {
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
  margin: 3px auto;
  width: 80%;
`;
const MyListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #efefef;
  height: fit-content;
  border-radius: 5px;
  margin: 0px auto;

  @media (min-width: 870px) {
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
  @media (max-width: 870px) {
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
  @media (min-width: 870px) {
    flex-direction: row;
    width: 85%;
    justify-content: space-between;
    margin: 155px auto 50px auto;
  }
  @media (max-width: 870px) {
    flex-direction: column;
    width: 95%;
    margin: 125px auto 50px auto;
  }
  display: flex;
  align-items: center;
  height: 100%;
`;

export default Profile;
