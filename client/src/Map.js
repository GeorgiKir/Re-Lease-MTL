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
                <div style={{ width: "350px" }}>
                  <img
                    src={selectedElement.listingImage}
                    width="350px"
                    height="scale"
                    style={{ borderRadius: "10px" }}
                  />
                  <p>{selectedElement.listingAddress}</p>
                  <p>{selectedElement.price} $</p>

                  <FiPlusCircle
                    style={{ fontSize: "30px" }}
                    onClick={() => {
                      setShowListingModal(true);
                    }}
                  />
                </div>
              </InfoWindow>
            )}
            {/* {activeMarker && (
              <OverlayView
                position={mapCenter}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={getPixelPositionOffset}
              >
                <div
                  style={{
                    width: "400px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    style={{
                      position: "absolute",
                      margin: "5px ",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "20px",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.52)",
                      border: "none",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setActiveMarker(null);
                    }}
                  >
                    <CgClose />
                  </button>

                  <img
                    src={selectedElement.listingImage}
                    width="100%"
                    height="scale"
                    // style={{ borderRadius: "10px" }}
                  />
                  <p>{selectedElement.listingAddress}</p>
                  <p>{selectedElement.price} $</p>
                  <FiPlusCircle
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={() => {
                      setShowListingModal(true);
                    }}
                  />
                </div>
              </OverlayView> */}
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
export default Map;
