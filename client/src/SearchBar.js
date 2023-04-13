import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./Header";
import { boroughs } from "./boroughs";

const SearchBar = ({
  searchCriteria,
  setSearchCriteria,
  handleSearchSubmit,
  setMapCenter,
  setZoom,
}) => {
  const handleChange = (value, name) => {
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  return (
    <StyledSearchBar>
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
              Please Select a neighbourhood
            </option>
            ;
            {boroughs.map((borough) => {
              return <option value={borough.borough}>{borough.borough}</option>;
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
      </StyledSearchForm>
    </StyledSearchBar>
  );
};
const FormInputElement = styled.div`
  display: flex;
  gap: 5px;
  & input,
  select {
    width: 60%;
  }
`;

const StyledSearchForm = styled.form`
  display: flex;
  /* width: 70vw; */
  gap: 1%;
  justify-content: space-between;
`;

const StyledSearchBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 55px;
  background-color: #41413f;
  height: 35px;
  z-index: 2;
  font-size: 20px;
  color: white;
  top: 0;
`;
export default SearchBar;
