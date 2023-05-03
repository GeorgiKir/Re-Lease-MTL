import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { TbHomeDollar } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import ListingModal from "./ListingModal";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import CommentsModal from "./CommentsModal";
import { BsArrowsFullscreen } from "react-icons/bs";
import { Trans, useTranslation } from "react-i18next";

const Map = ({ position, markerPosition, mapCenter, zoom, listings }) => {
  const { t, i18n } = useTranslation();
  const { currentUser, logoutState } = useContext(CurrentUserContext);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);
  const [showListingModal, setShowListingModal] = useState(false);
  const [showPhotoTracker, setShowPhotoTracker] = useState(0);
  const [numOfListingPhotos, setNumOfListingPhotos] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);

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

  const containerStyle = {
    width: "100%",
    height: "80vh",
    borderRadius: "5px",
    boxShadow: "1px 4px 15px -6px #000000",
  };

  return (
    <>
      <GoogleMap
        zoom={zoom}
        center={mapCenter}
        mapContainerStyle={containerStyle}
        options={{
          streetViewControl: false,
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {listings && (
          <>
            {listings.map((listing, index) => {
              return (
                <MarkerF
                  key={index}
                  position={listing.listingCoords}
                  onClick={() => {
                    setSelectedElement(listing);
                    setActiveMarker(listing.listingCoords);
                  }}
                />
              );
            })}
            {activeMarker && selectedElement && (
              <InfoWindow
                position={activeMarker}
                onCloseClick={() => {
                  setActiveMarker(null);
                }}
              >
                <InfoWindowInfoContainer style={{ maxWidth: "350px" }}>
                  <div style={{ display: "flex" }}>
                    <ArrowContainerDiv
                      onClick={() => {
                        handlePhotoTracker(0);
                      }}
                    >
                      <SlArrowLeft style={{ color: "white" }} />
                    </ArrowContainerDiv>

                    <img
                      src={selectedElement.listingImage[showPhotoTracker].url}
                    />
                    {/* <BsArrowsFullscreen
                    style={{
                      position: "absolute",
                      marginLeft: "290px",
                      marginTop: "180px",
                    }}
                    /> */}
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
                          fontSize: "30px",
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
                          fontSize: "30px",
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
              </InfoWindow>
            )}
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
          </>
        )}
      </GoogleMap>
    </>
  );
};

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
  /* background-color: rgba(28, 35, 33, 0.81); */
`;

const IconInfoMapModalDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
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
`;

const InfoWindowInfoContainer = styled.div`
  @media (min-width: 600px) {
    & img {
      width: 300px;
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
      width: calc(100% - 20px);
      height: "scale";
    }
    & p {
      font-size: 15px;
      margin-left: 10px;
    }
  }
`;
export default Map;
