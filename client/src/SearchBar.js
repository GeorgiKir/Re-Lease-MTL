import React from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { boroughs } from "./boroughs";

const SearchBar = ({
  searchCriteria,
  setSearchCriteria,
  handleSearchSubmit,
  setMapCenter,
  setZoom,
}) => {
  const { t, i18n } = useTranslation();
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
          <label>{t("searchBar.borough")}</label>
          <select
            required
            name="borough"
            placeholder={"Enter the neighbourhood"}
            onChange={(e) => {
              handleChange(e.target.value, e.target.name);
            }}
          >
            <option value="" style={{ color: "gray" }}>
              {t("searchBar.selectBorough")}
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
          <label>{t("searchBar.price")} </label>
          <input
            type="number"
            name="price"
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          />
        </FormInputElement>
        <FormInputElement>
          <label>{t("searchBar.bedrooms")} </label>
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
    height: fit-content;
  }
`;

export const StyledSearchForm = styled.form`
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
  font-family: "Jost", sans-serif;
  position: fixed;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 55px;
  background-color: #00abe4;
  z-index: 1;
  height: 40px;
  font-size: 20px;
  color: white;
  box-shadow: 0px 6px 15px -6px rgba(0, 0, 0, 0.64);
  top: 0;
`;
export default SearchBar;
