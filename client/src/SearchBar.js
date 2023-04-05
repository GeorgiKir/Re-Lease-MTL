import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./Header";
import { boroughs } from "./boroughs";

const SearchBar = ({
  searchCriteria,
  setSearchCriteria,
  handleSearchSubmit,
}) => {
  const handleChange = (value, name) => {
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };
  return (
    <StyledSearchBar>
      <form>
        <label>Borough: </label>
        <select
          required
          name="borough"
          placeholder={"Enter the neighbourhood"}
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        >
          <option value="" style={{ color: "gray" }}>
            Please Select a neighbourhood
          </option>
          ;
          {boroughs.map((borough) => {
            return <option value={borough}>{borough}</option>;
          })}
        </select>
        <label>Price: </label>
        <input
          type="number"
          name="price"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <label>Bedrooms: </label>
        <input
          type="number"
          name="bedroom"
          onChange={(e) => handleChange(e.target.value, e.target.name)}
        />
        <button
          type="button"
          onClick={() => {
            handleSearchSubmit(
              searchCriteria.borough,
              searchCriteria.price,
              searchCriteria.bedroom
            );
          }}
        >
          Search
        </button>
      </form>
    </StyledSearchBar>
  );
};

const StyledSearchBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 75px;
  background-color: #41413f;
  height: 35px;
  z-index: 2;
  gap: 5%;
  font-size: 20px;
  color: white;
  top: 0;
`;
export default SearchBar;
