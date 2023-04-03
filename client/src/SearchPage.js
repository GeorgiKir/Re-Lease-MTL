import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const SearchPage = () => {
  const [listings, setListings] = useState(null);
  useEffect(() => {
    fetch("/listings/listingResults")
      .then((res) => res.json())
      .then((resData) => {
        setListings(resData.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);
  return (
    <StorePageContainer>
      SearchPage
      {listings && (
        <div>
          {listings.map((listing) => {
            return <p>{listing.listingAddress}</p>;
          })}
        </div>
      )}
    </StorePageContainer>
  );
};

const StorePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-size: cover;
  margin-top: 75px;
`;

export default SearchPage;
