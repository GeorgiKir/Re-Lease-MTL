import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import Map from "./Map";

const MapSetup = ({
  mapCenter,
  zoom,
  markerPosition,
  listings,
  setMapCenter,
}) => {
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
          setMapCenter={setMapCenter}
          zoom={zoom}
          markerPosition={markerPosition}
          mapCenter={mapCenter}
          listings={listings}
        />
      )}
    </>
  );
};

export default MapSetup;
