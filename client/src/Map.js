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

const Map = ({ position, markerPosition, mapCenter, zoom, listings }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);
  const [showListingModal, setShowListingModal] = useState(false);

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
      >
        {/* {markerPosition && <MarkerF position={markerPosition} />} */}
        {listings && (
          <>
            {listings.map((listing, index) => {
              // console.log(listing.listingCoords);
              return (
                <MarkerF
                  key={index}
                  position={listing.listingCoords}
                  onClick={() => {
                    console.log("Clicked");
                    setSelectedElement(listing);
                    setActiveMarker(listing.listingCoords);
                    // console.log(activeMarker);
                  }}
                />
              );
            })}
            {activeMarker && (
              <InfoWindow
                position={activeMarker}
                onCloseClick={() => {
                  setActiveMarker(null);
                }}
              >
                <InfoWindowInfoContainer style={{ maxWidth: "350px" }}>
                  <img src={selectedElement.listingImage} />
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
                        <p>{selectedElement.numBDR} bedrooms</p>
                      </IconInfoMapModalDiv>
                    </TextInfoContainer>

                    <FiPlusCircle
                      style={{ fontSize: "30px", cursor: "pointer" }}
                      onClick={() => {
                        setShowListingModal(true);
                      }}
                    />
                  </PlusButtonContainer>
                </InfoWindowInfoContainer>
              </InfoWindow>
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
      width: 350px;
      height: "scale";
    }
    & p {
      font-size: 20px;
      margin-left: 15px;
    }
  }

  @media (max-width: 599px) {
    & img {
      width: 100%;
      height: "scale";
    }
    & p {
      font-size: 15px;
      margin-left: 10px;
    }
  }
`;
export default Map;
