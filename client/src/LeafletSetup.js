import React from "react";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

import LeafletMap from "./LeafletMap";

const LeafletSetup = ({
  mapCenter,
  zoom,
  markerPosition,
  listings,
  setMapCenter,
}) => {
  const [mapCenterState, setMapCenterState] = useState(null);

  if (!mapCenter) {
    return <p>No map center</p>;
  }

  return (
    <>
      {zoom && mapCenter && (
        <>
          <LeafletMap
            setMapCenter={mapCenterState}
            zoom={zoom}
            markerPosition={markerPosition}
            mapCenter={mapCenter}
            listings={listings}
          />
          ;
        </>
      )}
    </>
  );
};

export default LeafletSetup;
