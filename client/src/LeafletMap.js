import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import styled from "styled-components";
import "./App.css";
import { CurrentUserContext } from "./CurrentUserContext";
import LeafletModalContainer from "./LeafletModalContainer";

const LeafletMap = ({
  mapCenter,
  zoom,
  markerPosition,
  listings,
  setMapCenter,
}) => {
  const { t, i18n } = useTranslation();
  const { currentUser, logoutState } = useContext(CurrentUserContext);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);
  const [showLeafletListingModal, setShowLeafletListingModal] = useState(false);
  const [showPhotoTracker, setShowPhotoTracker] = useState(0);
  const [numOfListingPhotos, setNumOfListingPhotos] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {showLeafletListingModal && (
        <LeafletModalContainer
          setShowLeafletListingModal={setShowLeafletListingModal}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setShowCommentModal={setShowCommentModal}
          showLeafletListingModal={showLeafletListingModal}
          //   showPhotoTracker={showPhotoTracker}
          //   setShowPhotoTracker={setShowPhotoTracker}
        />
      )}

      {mapCenter && (
        <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={true}>
          <ChangeView center={mapCenter} zoom={zoom} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {listings && (
            <>
              {listings.map((listing, index) => {
                return (
                  <Marker
                    eventHandlers={{
                      click: (e) => {
                        setSelectedElement(listing);
                        setShowLeafletListingModal(true);
                      },
                    }}
                    position={listing.listingCoords}
                    icon={
                      new Icon({
                        iconUrl: markerIconPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })
                    }
                  ></Marker>
                );
              })}
            </>
          )}
        </MapContainer>
      )}
    </div>
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

const InfoWindowInfoContainer = styled.div`
  @media (min-width: 600px) {
    & img {
      width: 275px;
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
  display: flex;
  flex-direction: column;
`;

export default LeafletMap;
