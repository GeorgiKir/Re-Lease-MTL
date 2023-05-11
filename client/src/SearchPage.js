import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import MapSetup from "./MapSetup";
import SearchBar from "./SearchBar";
import SearchBarMobile from "./SearchBarMobile";
import { boroughs } from "./boroughs";
import LeafletSetup from "./LeafletSetup";

const ROOT_API = "https://re-lease-mtl.onrender.com";

const SearchPage = ({ setNavigationState }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [searchCriteria, setSearchCriteria] = useState({
    borough: "",
    price: "",
    bedroom: "",
  });

  const [mapCenter, setMapCenter] = useState({
    lat: 45.5019,
    lng: -73.5674,
  });
  const [zoom, setZoom] = useState(11);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [listings, setListings] = useState(null);
  const [showListingModal, setShowListingModal] = useState(false);
  const [targetListingForModal, setTargetListingForModal] = useState(null);

  useEffect(() => {
    setNavigationState("search");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleSearchSubmit = (borough, price, bedrooms, e) => {
    e.preventDefault();
    if (borough && price && bedrooms) {
      let coordsChecker = boroughs.filter((item) => {
        return item.borough === borough;
      });
      setMapCenter(coordsChecker[0].coords);
      setZoom(13.25);
      setMarkerPosition(null);

      fetch(
        `${ROOT_API}/listings/listingResults/${borough}/${price}/${bedrooms}`
      )
        .then((res) => res.json())
        .then((resData) => {
          setListings(resData.data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  if (!mapCenter) {
    return <p>No map center</p>;
  }

  return (
    <StorePageContainer>
      <SearchBar
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        handleSearchSubmit={handleSearchSubmit}
        setMapCenter={setMapCenter}
        setZoom={setZoom}
      />
      <SearchBarMobile
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        handleSearchSubmit={handleSearchSubmit}
        setMapCenter={setMapCenter}
        setZoom={setZoom}
      />
      <SearchPageContentContainer>
        {/* {mapCenter && (
          <MapSetup
            mapCenter={mapCenter}
            zoom={zoom}
            markerPosition={markerPosition}
            listings={listings}
            setMapCenter={setMapCenter}
          />
        )} */}
        {mapCenter && (
          <LeafletSetup
            mapCenter={mapCenter}
            zoom={zoom}
            markerPosition={markerPosition}
            listings={listings}
            setMapCenter={setMapCenter}
          />
        )}
      </SearchPageContentContainer>
    </StorePageContainer>
  );
};

const SearchPageContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 80vh;
  /* border: 1px solid blue; */
  z-index: 0;
  margin: 0px auto;
`;

const StorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-size: cover;
  margin: 125px auto 0px auto;
`;

export default SearchPage;
