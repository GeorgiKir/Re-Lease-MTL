import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ListingModal from "./ListingModal";

const SearchPage = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    borough: "",
    price: "",
    bedroom: "",
  });
  const [listings, setListings] = useState(null);
  const [showListingModal, setShowListingModal] = useState(false);
  const [targetListingForModal, setTargetListingForModal] = useState(null);

  const handleSearchSubmit = (borough, price, bedrooms) => {
    fetch(`/listings/listingResults/${borough}/${price}/${bedrooms}`)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData.data);
        setListings(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <StorePageContainer>
      <SearchBar
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        handleSearchSubmit={handleSearchSubmit}
      />
      <SearchPageContentContainer>
        {listings && (
          <ListingThumbnailContainer>
            {listings.map((listing) => {
              return (
                <>
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
                </>
              );
            })}
          </ListingThumbnailContainer>
        )}
        {showListingModal && targetListingForModal && (
          <ListingModal
            listingInfo={targetListingForModal}
            setShowListingModal={setShowListingModal}
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

const ListingThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
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
  margin: 145px auto 0px auto;
`;

export default SearchPage;
