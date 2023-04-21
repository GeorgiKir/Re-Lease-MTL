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
      <StyledSearchForm
        onSubmit={(e) => {
          handleSearchSubmit(
            searchCriteria.borough,
            searchCriteria.price,
            searchCriteria.bedroom,
            e
          );
        }}
      >
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
            {boroughs.map((borough, index) => {
              return (
                <option key={index} value={borough.borough}>
                  {borough.borough}
                </option>
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
          type="submit"
        >
          <FiSearch style={{ fontSize: "20px", color: "white" }} />
        </button>
      </StyledSearchForm>
    </StyledSearchBar>
  );
};
export const FormInputElement = styled.div`
  @media (min-width: 768px) {
  }

  @media (max-width: 767px) {
    justify-content: space-between;
  }
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

export const StyledSearchForm = styled.form`
  /* border: 1px solid blue; */
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    width: 60%;
  }

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
  display: flex;

  gap: 1%;
  justify-content: space-between;
`;

const StyledSearchBar = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }

  @media (max-width: 767px) {
    display: none;
  }
  /* border: 1px solid black; */
  font-family: "Open Sans", sans-serif;
  position: fixed;

  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 55px;
  background-color: #00abe4;
  /* background-color: #7d98a1; */
  z-index: 1;
  height: 40px;
  font-size: 20px;
  color: white;
  box-shadow: 0px 6px 15px -6px rgba(0, 0, 0, 0.64);
  top: 0;
`;
export default SearchBar;
