import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ListingModal from "./ListingModal";
import MapSetup from "./MapSetup";
import { boroughs } from "./boroughs";
import { ImSpinner } from "react-icons/im";

const SearchPage = () => {
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

  const handleSearchSubmit = (borough, price, bedrooms) => {
    let coordsChecker = boroughs.filter((item) => {
      return item.borough === borough;
    });
    setMapCenter(coordsChecker[0].coords);
    setZoom(12);
    setMarkerPosition(null);

    fetch(`/listings/listingResults/${borough}/${price}/${bedrooms}`)
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData.data);
        setListings(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  if (!mapCenter) {
    return <p>No map center</p>;
  }

  console.log("mapCenter from SearchPage.js:", mapCenter);
  return (
    <StorePageContainer>
      <SearchBar
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        handleSearchSubmit={handleSearchSubmit}
        setMapCenter={setMapCenter}
        setZoom={setZoom}
      />
      <SearchPageContentContainer>
        <ListingThumbnailWrapper>
          {listings && listings.length > 0 && (
            <>
              {listings.map((listing) => {
                return (
                  <ListingThumbnailContainer
                    onMouseEnter={() => {
                      setMarkerPosition(listing.listingCoords);
                      setZoom(15);
                      setMapCenter(listing.listingCoords);
                    }}
                  >
                    <p>Address: {listing.listingAddress}</p>
                    <p>Postal Code: {listing.postalCode}</p>
                    <p>Borough: {listing.borough}</p>
                    <p>Price: {listing.price}.00 $</p>
                    <button
                      onClick={() => {
                        // console.log(listing);
                        setTargetListingForModal(listing);
                        setShowListingModal(true);
                      }}
                    >
                      View Details
                    </button>
                  </ListingThumbnailContainer>
                );
              })}
            </>
          )}
        </ListingThumbnailWrapper>
        {showListingModal && targetListingForModal && (
          <ListingModal
            listingInfo={targetListingForModal}
            setShowListingModal={setShowListingModal}
          />
        )}
        {mapCenter && (
          <MapSetup
            mapCenter={mapCenter}
            zoom={zoom}
            markerPosition={markerPosition}
          />
        )}
      </SearchPageContentContainer>
    </StorePageContainer>
  );
};

const SearchPageContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  /* border: 1px solid blue; */
  margin: 0px auto;
`;

const ListingThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 70vh;
`;
const ListingThumbnailContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100px;
  border: 1px solid gray;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 5px 10px;
  box-shadow: 0px 2px 6px 5px rgba(0, 0, 0, 0.19);
`;
const StorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-size: cover;
  margin: 125px auto 0px auto;
`;

export default SearchPage;
