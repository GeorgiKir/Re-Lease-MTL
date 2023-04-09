import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
const Map = ({ position, markerPosition, mapCenter, zoom }) => {
  const containerStyle = {
    width: "60%",
    height: "70vh",
  };

  return (
    <>
      <GoogleMap
        zoom={zoom}
        center={mapCenter}
        mapContainerStyle={containerStyle}
      >
        {markerPosition && <MarkerF position={markerPosition} />}
      </GoogleMap>
    </>
  );
};
export default Map;
