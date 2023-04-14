import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./Header";
import { boroughs } from "./boroughs";
import { FiSearch } from "react-icons/fi";

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
              Select a borough
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
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          type="button"
          onClick={() => {
            handleSearchSubmit(
              searchCriteria.borough,
              searchCriteria.price,
              searchCriteria.bedroom
            );
          }}
        >
          <FiSearch style={{ fontSize: "20px", color: "white" }} />
        </button>
      </StyledSearchForm>
    </StyledSearchBar>
  );
};
const FormInputElement = styled.div`
  /* border: 1px solid red; */
  display: flex;
  height: 50px;
  align-items: center;
  gap: 5px;

  & input,
  select {
    width: 60%;
    border-radius: 3px;
    border: none;
    font-size: 15px;
    height: 45%;
  }
  & label {
    display: block;
    text-align: center;
    /* border: 1px solid green; */
    height: fit-content;
  }
`;

const StyledSearchForm = styled.form`
  /* border: 1px solid blue; */
  display: flex;
  width: 60%;
  gap: 1%;
  justify-content: space-between;
`;

const StyledSearchBar = styled.div`
  /* border: 1px solid black; */
  font-family: "Open Sans", sans-serif;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 55px;
  background-color: #7d98a1;
  /* background-color: #41413f; */
  height: 40px;
  z-index: 2;
  font-size: 20px;
  color: white;
  box-shadow: 0px 6px 15px -6px rgba(0, 0, 0, 0.64);
  top: 0;
`;
export default SearchBar;
