import React, { useEffect, useState } from "react";
import { FaBed } from "react-icons/fa";
import { FiMapPin, FiPlusCircle } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TbHomeDollar } from "react-icons/tb";
import styled from "styled-components";
import ListingModal from "./ListingModal";

import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineComment } from "react-icons/ai";
import CommentsModal from "./CommentsModal";
import { CurrentUserContext } from "./CurrentUserContext";

const LeafletModalContainer = ({
  selectedElement,
  setSelectedElement,
  setShowLeafletListingModal,
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const { t, i18n } = useTranslation();
  const { currentUser, logoutState } = useContext(CurrentUserContext);
  const [showPhotoTracker, setShowPhotoTracker] = useState(0);
  const [numOfListingPhotos, setNumOfListingPhotos] = useState(null);
  const [showListingModal, setShowListingModal] = useState(false);

  useEffect(() => {
    if (selectedElement) {
      setNumOfListingPhotos(selectedElement.listingImage.length);
      setShowPhotoTracker(0);
    }
  }, [selectedElement]);

  const handlePhotoTracker = (count) => {
    if (count == 1) {
      if (showPhotoTracker == numOfListingPhotos - 1) {
        setShowPhotoTracker(0);
      } else {
        setShowPhotoTracker((prev) => prev + 1);
      }
    } else {
      if (showPhotoTracker == 0) {
        setShowPhotoTracker(numOfListingPhotos - 1);

        return;
      } else {
        setShowPhotoTracker((prev) => prev - 1);
      }
    }
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <LeafletInfoContainer>
        <GrClose
          style={{
            margin: "2% 0px 0px 1%",
            cursor: "pointer",
            fontSize: "25px",
            position: "absolute",
          }}
          onClick={() => {
            setShowLeafletListingModal(false);
          }}
        />
        <InfoWindowInfoContainer style={{ maxWidth: "450px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",

              //   border: "1px solid black",
            }}
          >
            <ArrowContainerDiv
              onClick={() => {
                handlePhotoTracker(0);
              }}
            >
              <SlArrowLeft style={{ color: "white" }} />
            </ArrowContainerDiv>

            <img src={selectedElement.listingImage[showPhotoTracker].url} />

            <ArrowContainerDiv
              onClick={() => {
                handlePhotoTracker(1);
              }}
            >
              <SlArrowRight style={{ color: "white" }} />
            </ArrowContainerDiv>
          </div>
          <PlusButtonContainer>
            <TextInfoContainer>
              <IconInfoMapModalDiv>
                <FiMapPin style={{ fontSize: "20px" }} />
                <p>{selectedElement.listingAddress}</p>
              </IconInfoMapModalDiv>
              <IconInfoMapModalDiv>
                <TbHomeDollar style={{ fontSize: "20px" }} />
                <p>{selectedElement.price}$</p>
              </IconInfoMapModalDiv>
              <IconInfoMapModalDiv>
                <FaBed style={{ fontSize: "20px" }} />
                <p>
                  {selectedElement.numBDR} {t("listingModal.bedrooms")}
                </p>
              </IconInfoMapModalDiv>
            </TextInfoContainer>
            <div>
              <AiOutlineComment
                style={{
                  fontSize: "35px",
                  cursor: "pointer",
                  marginRight: "10px",
                  color: currentUser ? "black" : "gray",
                }}
                onClick={() => {
                  if (!currentUser) {
                    return;
                  } else {
                    setShowCommentModal(true);
                  }
                }}
              />
              <FiPlusCircle
                style={{
                  fontSize: "35px",
                  cursor: "pointer",
                  color: currentUser ? "black" : "gray",
                }}
                onClick={() => {
                  if (!currentUser) {
                    return;
                  } else {
                    setShowListingModal(true);
                  }
                }}
              />
            </div>
          </PlusButtonContainer>
        </InfoWindowInfoContainer>
      </LeafletInfoContainer>
      {showCommentModal && (
        <CommentsModal
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setShowCommentModal={setShowCommentModal}
        />
      )}
      {showListingModal && (
        <ListingModal
          listingInfo={selectedElement}
          setShowListingModal={setShowListingModal}
        />
      )}
    </div>
  );
};

const LeafletInfoContainer = styled.div`
  /* @media (min-width: 768px) {
    width: 20%;
  }
  @media (min-width: 1100px) {
    width: 30%;
  }
  @media (max-width: 767.9px) {
    width: 50%;
    & p {
      font-size: 15px;
    }
  } */
  width: fit-content;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  position: absolute;
  margin-top: 10%;
  margin-left: 1%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  background-color: #faf9f6;
  height: 65%;
  z-index: 6;
`;

const ArrowContainerDiv = styled.div`
  @media (min-width: 600px) {
    font-size: 15px;
  }
  @media (max-width: 767.9px) {
    font-size: 10px;
  }
  cursor: pointer;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0078a0;
  width: 25px;
`;

const InfoWindowInfoContainer = styled.div`
  @media (min-width: 600px) {
    & img {
      width: 80%;
      height: "scale";
      max-height: 250px;
    }
    & p {
      font-size: 18px;
      margin-left: 15px;
    }
  }

  @media (max-width: 599px) {
    & img {
      width: 80%;
      height: "scale";
    }
    & p {
      font-size: 15px;
      margin-left: 10px;
    }
  }

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 5% auto 0px auto;
`;

const IconInfoMapModalDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  /* border: 1px solid black; */
  & p {
    font-size: 20px;
  }
  & svg {
    color: #0078a0;
  }
`;

const TextInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PlusButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 5px;
  width: 85%;
  margin: 0px auto;
`;
export default LeafletModalContainer;
