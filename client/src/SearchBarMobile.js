import React from "react";
import styled from "styled-components";
import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import { FormInputElement, StyledSearchForm } from "./SearchBar";
import { boroughs } from "./boroughs";

const SearchBarMobile = ({
  searchCriteria,
  setSearchCriteria,
  handleSearchSubmit,
}) => {
  const [showDropdownSearch, setShowDropdownSearch] = useState(false);

  const handleChange = (value, name) => {
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  return (
    <MobileStyledSearchBar>
      <SearchMenuMobileButton
        onClick={() => {
          setShowDropdownSearch(!showDropdownSearch);
        }}
      >
        {!showDropdownSearch && <FiChevronDown style={{ fontSize: "30px" }} />}
        {showDropdownSearch && <FiChevronUp style={{ fontSize: "30px" }} />}
        {/* <FiSearch style={{ fontSize: "30px" }} /> */}
        <p style={{ fontSize: "20px" }}>Search</p>
      </SearchMenuMobileButton>
      {showDropdownSearch && (
        <MobileFormDropdownDiv>
          <StyledSearchForm>
            <FormInputElement>
              <label>Borough: </label>
              <select
                required
                name="borough"
                placeholder={"Enter the neighbourhood"}
                onChange={(e) => {
                  handleChange(e.target.value, e.target.name);
                }}
              >
                <option value="" style={{ color: "gray" }}>
                  Select a borough
                </option>
                ;
                {boroughs.map((borough) => {
                  return (
                    <option value={borough.borough}>{borough.borough}</option>
                  );
                })}
              </select>
            </FormInputElement>
            <FormInputElement>
              <label>Price: </label>
              <input
                type="number"
                name="price"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </FormInputElement>
            <FormInputElement>
              <label>Bedrooms: </label>
              <input
                type="number"
                name="bedroom"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </FormInputElement>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              type="button"
              onClick={() => {
                setShowDropdownSearch(false);
                handleSearchSubmit(
                  searchCriteria.borough,
                  searchCriteria.price,
                  searchCriteria.bedroom
                );
              }}
            >
              <FiSearch
                style={{ fontSize: "30px", color: "white", marginTop: "10px" }}
              />
            </button>
          </StyledSearchForm>
        </MobileFormDropdownDiv>
      )}
    </MobileStyledSearchBar>
  );
};

const MobileFormDropdownDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  /* background-color: #7d98a1; */
  height: fit-content;
`;
const SearchMenuMobileButton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  color: white;
`;
const MobileStyledSearchBar = styled.div`
  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 767px) {
    display: flex;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  /* border: 1px solid black; */
  font-family: "Open Sans", sans-serif;
  position: fixed;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 55px;
  background-color: #7d98a1;
  min-height: 40px;
  font-size: 20px;
  color: white;
  box-shadow: 0px 6px 15px -6px rgba(0, 0, 0, 0.64);
  top: 0;
`;

export default SearchBarMobile;
