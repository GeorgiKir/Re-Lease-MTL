import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Map from "./Map";

const MapSetup = ({ mapCenter, zoom, markerPosition }) => {
  console.log("mapCenter from MapSetup.js:", mapCenter);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACtT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!mapCenter) {
    return <p>No map center</p>;
  }
  return (
    <>
      {zoom && mapCenter && (
        <Map
          zoom={zoom}
          markerPosition={markerPosition}
          mapCenter={mapCenter}
        />
      )}
    </>
  );
  return <div> HELLO</div>;
};

export default MapSetup;
